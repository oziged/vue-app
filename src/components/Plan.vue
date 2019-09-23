<template>
  <div>
    <!-- MODAL WINDOW TO MOVE CHECKPOINTS -->
    <modal-window v-model="displayMoveModal" :width="'600px'" :height="'auto'">
      <div class="move_modal_wrapper">
        <div class="plan_title">{{ title }}</div>
        <vue-nestable v-model="data" :childrenProp="'nested'" class="nested">
          <vue-nestable-handle slot-scope="{ item }" :item="item" class="nested_item">
            {{ item.item.title }}
            <div @click="displayedSubMenu = item" class="edit_checkpoint_icon"></div>
            <transition name="fade">
              <div
                v-if="displayedSubMenu == item"
                v-click-outside="closeDisplayedSubMenu"
                class="edit_checkpoint_sub_menu"
              >
                <v-card max-width="400">
                  <v-list>
                    <v-list-item
                      @mousedown.prevent
                      @click.stop="closeDisplayedSubMenu(); setCheckpointEditId(item.item.id); toggleCheckpointEditModal()"
                    >
                      <v-list-item-content>
                        <v-list-item-title>Edit checkpoint</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @mousedown.prevent @click.stop>
                      <v-list-item-content>
                        <v-list-item-title>Add subCheckpoint</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @mousedown.stop.prevent @click.stop>
                      <v-list-item-content>
                        <v-list-item-title>Delete Checkpoint</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>
            </transition>
          </vue-nestable-handle>
        </vue-nestable>
        <v-btn class="save_checkpoint" color="success" dark>update checkpoints</v-btn>
      </div>
    </modal-window>

    <!-- DISPLAY PLAN'S CHECKPOINTS -->

    <div class="plan">
      <div class="plan_info">
        <div class="plan_title">
          <h1 @click="showPlanSubCheckpoints">{{ title }}</h1>
          <div class="moveModalIcon" @click="displayMoveModal=true"></div>
        </div>
        <p class="plan_description">{{ description }}</p>
        <div v-if="display" class="checkpoint_list_wrapper">
          <div class="checkpoints_list">
            <v-expansion-panels accordion style="width: calc(100% - 15px);">
              <checkpoint
                v-for="(checkpoint,i) in data"
                :key="i"
                :nestedLvl="1"
                :checkpoint="checkpoint.item"
                :nested="checkpoint.nested"
                :style="{paddingTop: i == 0 ? '10px' : '10px', marginBottom: '10px'}"
              ></checkpoint>
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

    <!--  -->
  </div>
</template>

<script>
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import { mapGetters, mapActions } from "vuex";
import AppMap from "./AppMap";
import Checkpoint from "./Checkpoint";
import draggable from "vuedraggable";
import nestedDraggable from "vuedraggable";
import ModalWindow from "./ModalWindow";

export default {
  props: ["id"],
  components: {
    AppMap,
    Checkpoint,
    BadgerAccordion,
    BadgerAccordionItem,
    draggable,
    nestedDraggable,
    ModalWindow
  },
  data: () => ({
    display: true,
    title: "",
    description: "",
    displayedSubMenu: null,
    displayedItemId: null,
    displayedItemType: "Plan",
    displayMoveModal: false,
    data: []
  }),
  methods: {
    ...mapActions([
      "updateMapPlaces",
      "setCurrentCheckpoint",
      "setCheckpointEditId",
      "toggleCheckpointEditModal"
    ]),
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
    },
    closeDisplayedSubMenu() {
      this.displayedSubMenu = null;
    },
    getDeepObject(data, searchId) {
      data == null ? (data = this.data) : "";
      let returnedObj = null;
      search(data, searchId);
      function search(start, searchId) {
        start.some((item, index) => {
          if (item.id != searchId && item.nested.length > 0) {
            search(item.nested, searchId);
          } else {
            if (item.id == searchId) {
              returnedObj = { item, parent: data };
            }
            return false;
          }
        });
      }
      return returnedObj;
    },
    setCheckpointsData(id, type) {
      let res = [];
      let self = this;
      function getNested(id) {
        let array = [];
        let subChecks = self.getSubCheckpoints(id, "Checkpoint", true);
        if (subChecks) {
          subChecks.forEach(item => {
            let obj = {
              item: item,
              id: item.id,
              nested: getNested(item.id)
            };
            array.push(obj);
          });
          return array;
        } else return [];
      }
      this.getSubCheckpoints(id, type).forEach(item => {
        let obj = {
          item: item,
          id: item.id,
          nested: getNested(item.id)
        };
        res.push(obj);
      });
      this.data = res;
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },

  mounted() {
    window.submenu = () => {
      return this.displayedSubMenu;
    };
    window.gett = () => {
      return this.getCheckpointEditId;
    };
    window.set = id => {
      this.setCheckpointEditId(id);
      return this.getCheckpointEditId;
    };
    window.data = () => {
      return this.data;
    };
    this.setCheckpointsData(this.id, "Plan");
    window.modal = () => {
      return this.displayMoveModal;
    };
    window.get = id => {
      return this.getDeepObject(this.data, id);
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
      "getPlanMainCheckpointId",
      "getCheckpointEditId"
    ])
  }
};
</script>

<style lang="scss" scoped>
.move_modal_wrapper {
  padding: 20px;
  .plan_title {
    display: block;
    cursor: pointer;
    padding: 3px 10px;
    margin-bottom: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
  .nested {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .nested_item {
    position: relative;
    &:hover {
      .edit_checkpoint_icon {
        opacity: 0.5;
      }
    }
  }
  .edit_checkpoint_icon {
    cursor: pointer;
    width: 20px;
    opacity: 0;
    transition: 0.3s;
    height: 20px;
    background: url("https://image.flaticon.com/icons/svg/17/17214.svg")
      no-repeat center center;
    background-size: cover;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  .edit_checkpoint_sub_menu {
    position: absolute;
    z-index: 100;
    right: 0;
    top: 110%;
  }
  .save_checkpoint {
    display: block;
    margin: 20px auto 0px auto;
  }
}

.plan {
  margin: 10px 20px;
  display: flex;
  .plan_info {
    width: 50%;
    margin-right: 10px;
    .plan_title,
    .plan_description {
      position: relative;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .checkpoint_list_wrapper {
      margin-left: 23px;
    }
    .plan_title {
      .moveModalIcon {
        display: block;
        cursor: pointer;
        width: 20px;
        opacity: 0.5;
        height: 20px;
        background: url("https://image.flaticon.com/icons/svg/17/17214.svg")
          no-repeat center center;
        background-size: cover;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .plan_map {
    width: 50%;
    height: 600px;
  }
}
</style>

<style>
/*
* Style for nestable
*/
.nestable {
  position: relative;
}
.nestable .nestable-list {
  margin: 0;
  padding: 0 0 0 40px;
  list-style-type: none;
}
.nestable > .nestable-list {
  position: relative;
  padding: 0;
}
.nestable-item,
.nestable-item-copy {
  position: relative;
  margin: 10px 0 0;
}
.nestable-item:first-child,
.nestable-item-copy:first-child {
  position: relative;
  margin-top: 0;
}
.nestable-item .nestable-list,
.nestable-item-copy .nestable-list {
  position: relative;
  margin-top: 10px;
}
.nestable-item {
  position: relative;
  position: relative;
}
.nestable-item.is-dragging .nestable-list {
  position: relative;
  pointer-events: none;
}
.nestable-item.is-dragging * {
  opacity: 0;
  filter: alpha(opacity=0);
}
.nestable-item.is-dragging:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(195, 195, 195, 0.671);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.nestable-drag-layer {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 100;
  pointer-events: none;
}
.nestable-drag-layer > .nestable-list {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  background-color: rgba(131, 131, 131, 0.274);
}
.nestable [draggable="true"] {
  cursor: move;
  padding: 3px 10px;
}
.nestable-handle {
  display: block;
}

.nestable-item-content {
  border: 2px solid rgba(0, 0, 0, 0.1);
}
</style>