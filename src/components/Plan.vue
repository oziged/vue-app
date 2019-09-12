<template>
  <div>
    <div class="plan">
      <div class="plan_info">
        <h1 class="plan_title" @click="showMainCheckpoints">{{ title }}</h1>
        <p class="plan_description">{{ description }}</p>
        <div class="checkpoint_list_wrapper">
          <div class="checkpoints_list" 
                style="margin-left: 20px;"
          >
            <v-expansion-panels accordion>
              <checkpoint
              style="margin-left: 0px;"
                v-for="(checkpoint,i) in getSubCheckpoints(id, 'Plan')"
                :key="i"
                :nestedLvl="1"
                :checkpoint="checkpoint"
              />
            </v-expansion-panels>
          </div>
        </div>
      </div>
      <app-map class="plan_map" :checkpointId="checkpointId" />
    </div>
  </div>
</template>

<script>
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import { mapGetters, mapActions } from "vuex";
import AppMap from "./AppMap";
import Checkpoint from "./Checkpoint";

export default {
  props: ["id"],
  components: {
    AppMap,
    Checkpoint,
    BadgerAccordion,
    BadgerAccordionItem
  },
  data: () => ({
    title: "",
    description: "",
    checkpointId: null
  }),
  methods: {
    ...mapActions(["updateMapPlaces", "setCurrentCheckpoint"]),
    showMainCheckpoints() {
      let subCheckpoints = this.getSubCheckpoints(this.id, "Plan");
      if (subCheckpoints) {
        this.updateMapPlaces(subCheckpoints);
      }
    },
    setCheckpointId(id) {
      this.checkpointId = id;
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },
  mounted() {
    let plan = this.getPlan(this.id);
    this.title = plan.title;
    this.description = plan.description;

    this.$gmapApiPromiseLazy().then(() => {
      this.showMainCheckpoints();
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
  }
  .plan_map {
    width: 50%;
    height: 600px;
  }
}
</style>