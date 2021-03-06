<template>
  <modal-window
    :value="value"
    :width="'600px'"
    :height="'auto'"
    :overflowY="'visible'"
    @input="$emit('input')"
  >
    <div class="move_modal_wrapper">
      <div class="plan_title">
        {{ plan.title }}
        <div class="edit_icon" @click="displayPlanSubMenu = true" />
        <div v-if="displayPlanSubMenu" v-click-outside="closePlanSubMenu" class="plan_sub_menu">
          <v-card max-width="400">
            <v-list>
              <v-list-item
                @click.stop="
                  planEditMode = true; 
                  displayPlanSubMenu = false
                "
                @touchend.stop
                @touchstart.stop
                @touchmove.stop
              >
                <v-list-item-content>
                  <v-list-item-title>Edit plan</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="
                closePlanSubMenu(); 
                toggleEditPlanModal(); 
                setParentCheckpointId(currentPlan.id); 
                setParentCheckpointType('Plan'); 
                toggleNewCheckpointModal()"
              >
                <v-list-item-content>
                  <v-list-item-title>Add subCheckpoint</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="
                closePlanSubMenu(); 
                DBremovePlan(currentPlan.id); 
                $router.push(`/`); 
                toggleEditPlanModal(); "
              >
                <v-list-item-content>
                  <v-list-item-title>Delete Plan</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </div>
      <div class="plan_edit_form" v-if="planEditMode">
        <input type="text" :placeholder="plan.title" v-model="planToUpdate.title" />
        <textarea
          name
          id
          cols="30"
          rows="10"
          :placeholder="plan.description"
          v-model="planToUpdate.description"
        ></textarea>
        <v-btn
          class="update_plan"
          @click="updatePlan(planToUpdate)"
          color="success"
          dark
        >update plan info</v-btn>
      </div>
      <vue-nestable
        @change="openSubMenuModal"
        v-model="data"
        :childrenProp="'nested'"
        class="nested"
      >
        <vue-nestable-handle
          slot-scope="{ item }"
          :item="item"
          class="nested_item"
          @touchstart.native="onTouchStart"
        >
          {{ item.item.title }}
          <div
            v-if="!isMobile"
            @click="displayedSubMenu = item; setSubMenuDirection();"
            class="edit_icon"
          ></div>
          <transition name="fade">
            <div
              v-if="displayedSubMenu == item"
              v-click-outside="closeDisplayedSubMenu"
              class="edit_checkpoint_sub_menu"
            >
              <v-card max-width="400">
                <v-list>
                  <v-list-item
                    @click.stop="closeDisplayedSubMenu(); setEditCheckpointModalId(item.item.id); toggleEditPlanModal(); toggleEditCheckpointModal()"
                    @touchend.stop="closeDisplayedSubMenu(); setEditCheckpointModalId(item.item.id); toggleEditPlanModal(); toggleEditCheckpointModal()"
                    @touchstart.stop
                    @touchmove.stop
                  >
                    <v-list-item-content>
                      <v-list-item-title>Edit checkpoint</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    @click.stop="closeDisplayedSubMenu(); toggleEditPlanModal(); setParentCheckpointId(item.item.id); setParentCheckpointType('Checkpoint'); toggleNewCheckpointModal()"
                  >
                    <v-list-item-content>
                      <v-list-item-title>Add subCheckpoint</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @mousedown.stop.prevent @click.stop="removeCheckpoint(item.item.id)">
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
      
      <modal-window
        :value="displayEditedItemModal"
        @input="displayEditedItemModal = false"
        :width="'auto'"
        :height="'auto'"
      >
        <v-card max-width="400">
          <v-list>
            <v-list-item
              @click.stop="displayEditedItemModal=false; closeDisplayedSubMenu(); setEditCheckpointModalId(editedItemId); toggleEditPlanModal(); toggleEditCheckpointModal()"
              @touchend.stop="displayEditedItemModal=false; closeDisplayedSubMenu(); setEditCheckpointModalId(editedItemId); toggleEditPlanModal(); toggleEditCheckpointModal()"
              @touchstart.stop
              @touchmove.stop
            >
              <v-list-item-content>
                <v-list-item-title>Edit checkpoint</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click.stop="closeDisplayedSubMenu(); toggleEditPlanModal(); toggleNewCheckpointModal()"
            >
              <v-list-item-content>
                <v-list-item-title>Add subCheckpoint</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @mousedown.stop.prevent @click.stop="removeCheckpoint(editedItemId)">
              <v-list-item-content>
                <v-list-item-title>Delete Checkpoint</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </modal-window>
    </div>
  </modal-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalWindow from "./ModalWindow";

export default {
  components: {
    ModalWindow
  },
  props: ["value"],
  data() {
    return {
      data: [],
      plan: null,
      planToUpdate: this.plan,
      planEditMode: false,
      editedItemId: null,
      displayEditedItemModal: false,
      nestableInputTime: 0,
      displayedSubMenu: null,
      displayPlanSubMenu: false
    };
  },
  computed: {
    ...mapGetters([
      "editPlanModalId",
      "getSubCheckpoints",
      "getPlan",
      "windowWidth",
      "isMobile",
      "currentPlanCheckpoints",
      "currentPlan"
    ])
  },
  methods: {
    console() {
      console.log("console");
      this.displayPlanSubMenu = true;
      console.log(this.displayPlanSubMenu);
    },
    onTouchStart(e) {
      let coord = e.target.getBoundingClientRect();
      let layer = document.querySelector(".nestable-drag-layer");
      layer.style.left = coord.x - 1 + "px";
      layer.style.top = coord.y - 1 + "px";
      this.nestableInputTime = new Date();
    },
    openSubMenuModal(item, options) {
      let timeToClick = new Date() - this.nestableInputTime;
      if (
        timeToClick < 500 &&
        (options.pathTo == null || options.pathTo == undefined)
      ) {
        this.editedItemId = item.id;
        this.displayEditedItemModal = true;
      }
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
              parentId: id,
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
    },
    setSubMenuDirection(e) {
      let modal = document.querySelector(".move_modal_wrapper");
      this.$nextTick(() => {
        let subMenu = document.querySelectorAll(".edit_checkpoint_sub_menu");
        subMenu = subMenu[subMenu.length - 1];
        if (
          modal.getBoundingClientRect().bottom <
          subMenu.getBoundingClientRect().bottom
        ) {
          subMenu.style.top = `-${160 + 5}px`;
        }
      });
    },
    closeDisplayedSubMenu() {
      this.displayedSubMenu = null;
    },
    closePlanSubMenu(e) {
      this.displayPlanSubMenu = false;
    },
    ...mapActions([
      "setEditCheckpointModalId",
      "toggleEditCheckpointModal",
      "toggleNewCheckpointModal",
      "toggleEditPlanModal",
      "setEditPlanModalId",
      "setParentCheckpointId",
      "setParentCheckpointType",
      "removeCheckpoint",
      "DBremovePlan",
      "updatePlan"
    ])
  },
  watch: {
    value(newValue) {
      if (newValue) {
        setTimeout(() => {
          let modal = document.querySelector(".move_modal_wrapper");
          let wrapper = document.querySelector(".modal_window");
          if (wrapper.clientHeight < modal.clientHeight)
            wrapper.style.overflowY = "scroll";
        }, 0);
      } else this.planEditMode = false;
    },
    editPlanModalId(newValue) {
      this.plan = this.getPlan(newValue);
      this.planToUpdate = Object.assign({}, this.plan);
      this.setCheckpointsData(newValue, "Plan");
    },
    currentPlanCheckpoints: {
      handler() {
        if (this.editPlanModalId)
          this.setCheckpointsData(this.editPlanModalId, "Plan");
      },
      deep: true
    },
    currentPlan(newValue) {
      console.log("plan was updated");
      this.plan = newValue;
      this.planToUpdate = Object.assign({}, this.plan);
    }
  },
  mounted() {
    window.get = this.getSubCheckpoints;
    window.itme = () => this.editedItemId;
    window.data = () => this.data;
  }
};
</script>

<style lang="scss" scoped>
.move_modal_wrapper {
  padding: 20px;
  .plan_title {
    display: block;
    cursor: pointer;
    position: relative;
    padding: 3px 10px;
    margin-bottom: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    &:hover {
      .edit_icon {
        opacity: 0.4;
      }
    }
    .plan_sub_menu {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
    }
  }
  .plan_edit_form {
    display: flex;
    flex-direction: column;
    .update_plan {
      margin: 20px 0;
    }
    input {
      margin-bottom: 5px;
    }
    input,
    textarea {
      background-color: #f4f8f7;
      height: 50px;
      padding: 10px;
      &:focus {
        outline: none;
      }
    }
    textarea {
      height: 200px;
    }
  }
  .nested {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .nested_item {
    position: relative;
    &:hover {
      .edit_icon {
        opacity: 0.5;
      }
    }
  }
  .edit_icon {
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
</style>

<style lang="scss">
// .nestable-drag-layer {
//   position: absolute !important;
//   top: 10px;
//   left: 0;
//   z-index: 100;
//   pointer-events: none;
// }
</style>