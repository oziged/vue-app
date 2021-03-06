<template>
  <v-expansion-panel
    @mouseenter.native="displayMoreButton=true"
    @mouseleave.native="displayMoreButton=false"
    :style="{marginLeft: nestedLvl == 1  ? '0px' : '31.5px'}"
    class="checkpoint_full"
    :data-id="checkpoint.id"
  >
    <v-expansion-panel-header style="position: relative" @click="setCheckpointId(checkpoint.id)">
      <template v-slot:actions>
        <v-icon color="no-icon"></v-icon>
      </template>
      <div
        :style="{position: 'absolute', width: '4px', height: '100%', top: '0', left: nestedLvl==1 ? '-15px' : -10+nestedLvl*1+'px', backgroundColor: nestedColors[nestedLvl]}"
      ></div>
      <div
        style="height: 100%"
        class="checkpoint_title"
        :class="{ 'subcheckpoint': nestedLvl > 1, 'plan_checkpoint' : nestedLvl==1 }"
      >
        <transition name="click">
          <div v-if="displayMoreButton || isMobile" class="interaction_buttons">
            <div class="click" @click.stop="setAndOpenModal(checkpoint.id)"></div>
            <div
              v-if="windowWidth < 800"
              class="mobile_map_button"
              @click.stop="setMobileMapModalItemId(checkpoint.id); setMobileMapModalItemType('Checkpoint'); toggleMobileMapModal()"
            ></div>
          </div>
        </transition>
        {{ checkpoint.title }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      style="padding-left: 20px; margin-left: -20px; position: relative;"
      :class="{ 'checkpoint_content' : checkpoint.checkable_type == 'Plan'}"
    >
      <div
        :style="{position: 'absolute', width: '4px', height: '100%', top: '0', left: nestedLvl==1 ? '5px' : 10+nestedLvl*1+'px', backgroundColor: nestedColors[nestedLvl]}"
      ></div>
      <div
        class="checkpoint_description"
        :class="{ 'margin10':getSubCheckpoints(checkpoint.id, 'Checkpoint')['id']==checkpoint.id && checkpoint.checkable_type=='Plan' }"
      >{{ checkpoint.description | truncate(20) }}</div>
      <v-expansion-panels
        style="margin-bottom: 10px; width: calc(100% - 15px);"
        v-if="nested.length>0"
        accordion
      >
        <checkpoint
          v-for="(item,i) in nested"
          :key="i"
          :nested="item.nested"
          :nestedLvl="nestedLvl+1"
          :checkpoint="item.item"
        />
      </v-expansion-panels>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";
import TweenMax from "gsap";
import nestedDraggable from "vuedraggable";
import draggable from "vuedraggable";

export default {
  name: "Checkpoint",
  props: ["checkpoint", "nestedLvl", "nested"],
  inject: ["setCheckpointId"],
  data() {
    return {
      displayMoreButton: false
    };
  },
  components: {
    Checkpoint,
    nestedDraggable,
    draggable
  },
  methods: {
    setAndOpenModal(id) {
      if (id == this.mainCheckpointModalId) return;
      if (this.$el.closest(".modal_window")) {
        TweenMax.to(".left_block_wrapper, .prev_next_checkpoint_small", 0.5, {
          opacity: 0,
          x: "-100%",
          ease: Power3.easeOut
        });
        TweenMax.to(".left_block_wrapper, .prev_next_checkpoint_small", 0.5, {
          opacity: 1,
          x: "0%",
          ease: Power3.easeOut,
          delay: 0.5
        });
        TweenMax.to(".right_block", 0.5, {
          opacity: 0,
          x: "100%",
          ease: Power3.easeOut
        });
        TweenMax.to(".right_block", 0.5, {
          opacity: 1,
          x: "0%",
          ease: Power3.easeOut,
          delay: 0.5
        });
        setTimeout(() => {
          this.setMainCheckpointModalId(id);
        }, 500);
      } else {
        this.setMainCheckpointModalId(id);
        this.mainCheckpointModalDisplay == false
          ? this.toggleMainCheckpointModal()
          : "";
      }
    },
    ...mapActions([
      "updateMapPlaces",
      "setMainCheckpointModalId",
      "toggleMainCheckpointModal",
      "setMobileMapModalItemId",
      "setMobileMapModalItemType",
      "toggleMobileMapModal"
    ])
  },
  computed: {
    ...mapGetters([
      "getSubCheckpoints",
      "getCheckpoint",
      "mainCheckpointModalDisplay",
      "nestedColors",
      "mainCheckpointModalId",
      "windowWidth",
      "mobileMapModalItemId",
      "mobileMapModalItemType",
      "isMobile"
    ])
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.click-enter-active,
.click-leave-active {
  transition: all 0.3s;
}

.click-enter,
.click-leave-to {
  opacity: 0;
}

.checkpoint_title {
  font-size: 16px;
  position: relative;
  .click {
    display: block;
    width: 20px;
    height: 20px;
    background: url("../assets/Checkpoint/more.png") no-repeat center center;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .mobile_map_button {
    display: block;
    width: 20px;
    height: 20px;
    background: url("../assets/Checkpoint/navigator.png") no-repeat center
      center;
    background-size: cover;
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.checkpoint_description {
  position: relative;
  margin-bottom: 10px;
  // padding-bottom: 10px;
}
.checkpoint_description:before {
  content: "";
  position: absolute;
  top: 0px;
  left: -20px;

  width: 60px;
  height: calc(100%);

  background: radial-gradient(circle, #000 2px, transparent 2px) top / 8px 8px
    repeat-y;
}

.plan_checkpoint::before {
  content: "";
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translateY(-50%);

  width: 22px;
  height: 22px;

  background: url("https://image.flaticon.com/icons/svg/25/25615.svg") center /
    100% no-repeat;
}

.subcheckpoint {
  position: relative;
  padding: 10px 0;
  padding-right: 55px;
}

.subcheckpoint::before {
  content: "";
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translateY(-50%);

  width: 22px;
  height: 22px;
  background: radial-gradient(circle, black 5px, transparent 5px) center / 20px
    no-repeat;
}

.checkpoint_description {
  padding-left: 24px;
  padding-right: 24px;
  // border-bottom: 1px solid rgba(0, 0, 0, .2)
}

// .checkpoint_full {
//   box-shadow: -5px 0px 0px 0px black;
//   border-radius: 0;
// }
</style>