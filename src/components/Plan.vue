<template>
  <div>
    <!-- DISPLAY PLAN'S CHECKPOINTS -->
    <div class="plan">
      <div class="plan_info">
        <div class="plan_title">
          <h1 @click="showPlanSubCheckpoints">{{ title }}</h1>
          <div class="moveModalIcon" @click="toggleEditPlanModal(); setEditPlanModalId(id)"></div>
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
    data: [],
    overflowY: "visible",
    plan: null
  }),
  methods: {
    ...mapActions([
      "updateMapPlaces",
      "setEditCheckpointModalId",
      "toggleEditCheckpointModal",
      "toggleNewCheckpointModal",
      "toggleEditPlanModal",
      "setEditPlanModalId"
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
    setSubMenuDirection(e) {
      let modal = document.querySelector(".move_modal_wrapper");
      // modal.style.overflow = "hidden";
      this.$nextTick(() => {
        let subMenu = document.querySelectorAll(".edit_checkpoint_sub_menu");
        subMenu = subMenu[subMenu.length - 1];
        if (
          modal.getBoundingClientRect().bottom <
          subMenu.getBoundingClientRect().bottom
        ) {
          subMenu.style.top = `-${160 + 5}px`;
        }
        setTimeout(() => {
        }, 500);
      });
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
  watch: {
    displayMoveModal(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          let windowHeight = document.documentElement.clientHeight;
          let modal = document.querySelector(".move_modal_wrapper");
          let modalHeight = modal.clientHeight;
          if ((modalHeight * 100) / windowHeight > 90) {
            this.overflowY = "scroll";
          }
        });
      }
    }
  },
  mounted() {
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
    this.plan = this.getPlan(this.id);
    let plan = this.getPlan(this.id);
    this.title = plan.title;
    console.log(plan);
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
    top: 0;
  }
  .save_checkpoint {
    display: block;
    margin: 20px auto 0px auto;
  }
}

.plan {
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