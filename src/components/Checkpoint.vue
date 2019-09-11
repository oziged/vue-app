<template>
  <v-expansion-panel style="position: relative" class="checkpoint_full">
    <transition name="test">
    <div
      :style="{position: 'absolute', width: '2px', height: '100%', top: '0', left: '-'+Math.random()*100+'px', backgroundColor: 'black'}"
    ></div>
    </transition>
    <v-expansion-panel-header @click="setCheckpointId(checkpoint.id)">
      <div
        class="checkpoint_title"
        :class="{ 'subcheckpoint': checkpoint.checkable_type == 'Checkpoint', 'plan_checkpoint' : checkpoint.checkable_type == 'Plan' }"
      >
        <div class="click" @click="setAndOpenModal(checkpoint.id)"></div>
        {{ checkpoint.title }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      :class="{ 'checkpoint_content' : checkpoint.checkable_type == 'Plan'}"
    >
      <div
        class="checkpoint_description"
        :class="{ 'margin10':getSubCheckpoints(checkpoint.id, 'Checkpoint')['id']==checkpoint.id && checkpoint.checkable_type=='Plan' }"
      >{{ checkpoint.description }}</div>
      <v-expansion-panels
        v-if="getSubCheckpoints(checkpoint.id, 'Checkpoint')[0]['id']!=checkpoint.id"
        accordion
      >
        <checkpoint
          v-for="(item,i) in getSubCheckpoints(checkpoint.id, 'Checkpoint')"
          :key="i"
          :checkpoint="item"
        />
      </v-expansion-panels>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";

export default {
  name: "Checkpoint",
  props: ["checkpoint"],
  inject: ["setCheckpointId"],
  components: {
    Checkpoint
  },
  methods: {
    setAndOpenModal(id) {
      this.setPlanModalCheckpointId(id);
      this.toggleCheckpointModal();
      this.planCheckpointModalDisplay == false
        ? this.toggleCheckpointModal()
        : "";
    },
    ...mapActions([
      "updateMapPlaces",
      "setCurrentCheckpoint",
      "setPlanModalCheckpointId",
      "toggleCheckpointModal"
    ])
  },
  computed: {
    ...mapGetters([
      "getSubCheckpoints",
      "getCheckpoint",
      "planCheckpointModalDisplay"
    ])
  }
};
</script>

<style lang="scss" scoped>
.test-enter-active,
.test-leave-active {
  transition: all 0.3s;
  position: absolute;
}


.test-enter,
.test-leave-to {
  opacity: 0;
}

.checkpoint_title {
  font-size: 16px;
  position: relative;
  padding-left: 10px;
  .click {
    width: 10px;
    height: 10px;
    background-color: black;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.checkpoint_description {
  position: relative;
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

.margin10 {
  margin-bottom: 10px;
}
</style>