<template>
  <modal-window
    :value="value"
    :width="'600px'"
    :height="'auto'"
    :overflowY="'visible'"
    @input="$emit('input')"
  >
    <div class="move_modal_wrapper">
      <div class="plan_title">{{ plan.title }}</div>
      <vue-nestable v-model="data" :childrenProp="'nested'" class="nested">
        <vue-nestable-handle slot-scope="{ item }" :item="item" class="nested_item">
          {{ item.item.title }}
          <div
            @click="displayedSubMenu = item; setSubMenuDirection();"
            class="edit_checkpoint_icon"
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
      displayedSubMenu: null
    };
  },
  computed: {
    ...mapGetters(["editPlanModalId", "getSubCheckpoints", "getPlan"])
  },
  methods: {
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
     ...mapActions([
      "setEditCheckpointModalId",
      "toggleEditCheckpointModal",
      "toggleNewCheckpointModal",
      "toggleEditPlanModal",
      "setEditPlanModalId"
    ]),
  },
  watch: {
    editPlanModalId(newValue) {
      this.plan = this.getPlan(newValue);
      this.setCheckpointsData(newValue, "Plan");
    }
  },
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
</style>