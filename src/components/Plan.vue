<template>
  <div>
    <div class="plan">
      <div class="plan_info">
        <h1 class="plan_title" @click="showPlanSubCheckpoints">{{ title }}</h1>
        <p class="plan_description">{{ description }}</p>
        <div v-if="display" class="checkpoint_list_wrapper">
          <div class="checkpoints_list">
            <v-expansion-panels accordion style="width: calc(100% - 15px);">
              <nested-draggable @end="console" :tasks="data" style="width: 100%">
                <draggable :list="data">
                  <checkpoint
                    v-for="(checkpoint,i) in data"
                    :key="i"
                    :nestedLvl="1"
                    :checkpoint="checkpoint.item"
                    :nested="checkpoint.nested"
                    :style="{paddingTop: i == 0 ? '10px' : '10px', marginBottom: '10px'}"
                  ></checkpoint>
                </draggable>
              </nested-draggable>
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
import nestedDraggable from "vuedraggable";

export default {
  props: ["id"],
  components: {
    AppMap,
    Checkpoint,
    BadgerAccordion,
    BadgerAccordionItem,
    draggable,
    nestedDraggable
  },
  data: () => ({
    display: true,
    title: "",
    description: "",
    displayedItemId: null,
    displayedItemType: "Plan",
    data: [],
    oldParent: ""
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
    },
    console(e) {
      console.log(e);
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },

  mounted() {
    window.d = () => {
      this.display = !this.display;
      this.$forceUpdate();
    }
    window.data = () => {
      return this.data;
    };
    let start = this.data;
    window.clear = () => {
      this.oldParent = null;
    };
    window.start = () => this.data;
    window.deepSearch = (start, searchId) => {
      console.log(start);
      console.log("start");
      start.forEach((item, index) => {
        if (item.id != searchId && item.nested.length > 0) {
          this.oldParent = start;
          window.deepSearch(item.nested, searchId);
        } else {
          if (item.id == searchId) {
            console.log("FOUND!!!!!");
            console.log(start);
            console.log(item);
            console.log(this.oldParent);
            start.splice(index, 1);
            this.oldParent.push(item);
          }
        }
      });
    };
    (window.swap = () => {
      this.data.push(this.data[0]);
      // [this.data[0], this.data[1]] = [this.data[1], this.data[0]];
      this.$forceUpdate();
      // [arr[0], arr[1]] = [arr[1], arr[0]];
    }),
      (window.info = () => {
        return [this.displayedItemId, this.displayedItemType];
      });
    let plan = this.getPlan(this.id);
    this.title = plan.title;
    this.description = plan.description;

    this.$gmapApiPromiseLazy().then(() => {
      this.displayedItemId = this.id;
    });
    let res = [];
    let self = this;
    function deep(id) {
      let array = [];
      let subChecks = self.getSubCheckpoints(id, "Checkpoint", true);
      if (subChecks) {
        console.log(subChecks);
        subChecks.forEach(item => {
          let obj = { item: item, id: item.id, nested: deep(item.id) };

          array.push(obj);
        });
        return array;
      } else {
        return [];
      }
    }
    this.getSubCheckpoints(this.id, "Plan").forEach(item => {
      let obj = { item: item, id: item.id, nested: deep(item.id) };
      res.push(obj);
    });
    this.data = res;
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