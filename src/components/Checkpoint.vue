<template>
  <v-expansion-panel style="margin-left: 31px;" class="checkpoint_full" >
    <!-- {{ checkpoint.border_color }} -->
    <v-expansion-panel-header style="position: relative" @click="setCheckpointId(checkpoint.id)">
      <div
        :style="{position: 'absolute', width: '4px', height: '100%', top: '0', left: nestedLvl==1&&checkpoint.checkable_type=='Plan' ? '-15px' : -10+nestedLvl*1+'px', backgroundColor: checkpoint.border_color}"
      ></div>
      <div
        style="height: 100%"
        class="checkpoint_title"
        :class="{ 'subcheckpoint': checkpoint.checkable_type == 'Checkpoint', 'plan_checkpoint' : checkpoint.checkable_type == 'Plan' }"
      >
        <div class="click" @click="setAndOpenModal(checkpoint.id)"></div>
        {{ checkpoint.title }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      style="padding-left: 20px; margin-left: -20px;"
      :class="{ 'checkpoint_content' : checkpoint.checkable_type == 'Plan'}"
    >
      <div
        :style="{position: 'absolute', width: '4px', height: '100%', top: '0', left: nestedLvl==1&&checkpoint.checkable_type=='Plan' ? '-15px' : -10+nestedLvl*1+'px', backgroundColor: checkpoint.border_color}"
      ></div>
      <div
        class="checkpoint_description"
        :class="{ 'margin10':getSubCheckpoints(checkpoint.id, 'Checkpoint')['id']==checkpoint.id && checkpoint.checkable_type=='Plan' }"
      >{{ checkpoint.description }}</div>
      <v-expansion-panels
        style="width: calc(100% - 15px)"
        v-if="getSubCheckpoints(checkpoint.id, 'Checkpoint')[0]['id']!=checkpoint.id"
        accordion
      >
        <checkpoint
          v-for="(item,i) in getSubCheckpoints(checkpoint.id, 'Checkpoint')"
          :key="i"
          :nestedLvl="nestedLvl+1"
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
  props: ["checkpoint", 'nestedLvl'],
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
  // margin-bottom: 10px;
}
</style>