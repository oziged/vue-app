<template>
  <div class="plan">
    <div class="plan_info">
      <div class="plan_title">
        <!-- <h1 @click="showPlanSubCheckpoints">{{ currentPlan.title }}</h1> -->
        <h1 @click="showPlanSubCheckpoints">{{ test.title }}</h1>
        <div class="moveModalIcon" @click="toggleEditPlanModal(); setEditPlanModalId(id)"></div>
      </div>
      <p class="plan_description">{{ test.description | truncate(20)}}</p>
      <!-- <p class="plan_description">{{ currentPlan.description | truncate(20)}}</p> -->
      <div class="checkpoint_list_wrapper">
        <div class="checkpoints_list">
          <v-expansion-panels accordion>
            <checkpoint
              v-for="(checkpoint,i) in test.nested"
              class="checkpoint"
              :key="i"
              :nestedLvl="1"
              :checkpoint="checkpoint"
              :nested="checkpoint.nested"
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
</template>

<script>
import axios from 'axios';

import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import { mapGetters, mapActions } from "vuex";
import AppMap from "../AppMap";
import Checkpoint from "../Checkpoint";
import draggable from "vuedraggable";
import nestedDraggable from "vuedraggable";
import ModalWindow from "../ModalWindow";

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
    plan: {
      title: "",
      description: ""
    },
    test: {},
    displayedSubMenu: null,
    displayedItemId: null,
    displayedItemType: "Plan",
  }),


  methods: {
    ...mapActions([
      "updateMapPlaces",
      "setEditCheckpointModalId",
      "toggleEditCheckpointModal",
      "toggleNewCheckpointModal",
      "toggleEditPlanModal",
      "setEditPlanModalId",
      "setCurrentPlan"
    ]),

    showPlanSubCheckpoints() {
      this.displayedItemId = this.params.id;
      this.displayedItemType = "Plan";
    },

    setCheckpointId(id) {
      this.displayedItemId = id;
      this.displayedItemType = "Checkpoint";
    },
  },


  provide() {
    return {
      setCheckpointId: this.setCheckpointId,
      toggleMobileMap: this.toggleMobileMap
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
    console.log("HERE?")
    axios.get('http://localhost:3000/api/plans/' + this.params.id)
    .then(response => {
      console.log(response.data)
      this.test = response.data
    })

    // this.setCurrentPlan(this.params.id);
    // this.plan = this.currentPlan;
    this.$gmapApiPromiseLazy().then(() => {
      this.displayedItemId = this.params.id;
    });
  },


  computed: {
    // data() {
    //   return this.currentPlanCheckpoints;
    // },

    params() {
      return this.$route.params
    },

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
      "currentPlanCheckpoints",
      "currentPlan"
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
    .plan_title {
      padding-right: 20px;
      h1 {
        line-height: 30px;
      }
    }
    .checkpoint_list_wrapper {
      width: calc(100% - 23px);
      margin-left: 23px;
      .checkpoints_list {
        width: calc(100% - 15px);
      }
      .checkpoint {
        padding-top: 10px;
        padding-bottom: 10px;
      }
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

@media (max-width: 800px) {
  .plan {
    flex-direction: column;
  }
  .plan_map {
    display: none;
  }
  .plan {
    .plan_info {
      width: 100%;
    }
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