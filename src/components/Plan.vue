<template>
  <div>
    <div class="plan">
      <div class="plan_info">
        <h1 class="plan_title" @click="showPlanSubCheckpoints">{{ title }}</h1>
        <p class="plan_description">{{ description }}</p>
        <div class="checkpoint_list_wrapper">
          <div class="checkpoints_list">
            <v-expansion-panels accordion style="width: calc(100% - 15px);">
              <draggable style="width: 100%">
                  <checkpoint
                    v-for="(checkpoint,i) in getSubCheckpoints(id, 'Plan')"
                    :key="i"
                    :nestedLvl="1"
                    :checkpoint="checkpoint"
                    :style="{paddingTop: i == 0 ? '10px' : '10px', marginBottom: '10px'}"
                  />
              </draggable>
            </v-expansion-panels>
          </div>
        </div>
      </div>
      <app-map
        class="plan_map"
        :displayedItemId="displayedItemId"
        :displayedItemType="displayedItemType"
      />
    </div>
  </div>
</template>

<script>
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import { mapGetters, mapActions } from "vuex";
import AppMap from "./AppMap";
import Checkpoint from "./Checkpoint";
import draggable from "vuedraggable";

export default {
  props: ["id"],
  components: {
    AppMap,
    Checkpoint,
    BadgerAccordion,
    BadgerAccordionItem,
    draggable
  },
  data: () => ({
    title: "",
    description: "",
    displayedItemId: null,
    displayedItemType: "Plan"
  }),
  methods: {
    ...mapActions(["updateMapPlaces", "setCurrentCheckpoint"]),
    showPlanSubCheckpoints() {
      this.displayedItemId = this.id;
      this.displayedItemType = "Plan";
    },
    setCheckpointId(id) {
      this.displayedItemId = id;
      this.displayedItemType = "Checkpoint";
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },
  mounted() {
    window.info = () => {
      return [this.displayedItemId, this.displayedItemType];
    };
    let plan = this.getPlan(this.id);
    this.title = plan.title;
    this.description = plan.description;

    this.$gmapApiPromiseLazy().then(() => {
      this.displayedItemId = this.id;
    });
  },
  computed: {
    ...mapGetters([
      "allUsers",
      "allPlans",
      "allPlaces",
      "allCheckpoints",
      "getPlace",
      "getCheckpoint",
      "getSubCheckpoints",
      "getPlan",
      "getPlanMainCheckpointId"
    ])
  }
};
</script>

<style lang="scss" scoped>
.drag-move {
  transition: transform 1s;
}

.plan {
  margin: 10px 20px;
  display: flex;
  .plan_info {
    width: 50%;
    margin-right: 10px;
    .plan_title,
    .plan_description {
      padding: 10px;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .checkpoint_list_wrapper {
      margin-left: 23px;
    }
  }
  .plan_map {
    width: 50%;
    height: 600px;
  }
}
</style>