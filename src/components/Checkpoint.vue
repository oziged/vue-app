<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div
        class="checkpoint_title"
        :class="{ 'subcheckpoint': checkpoint.checkable_type == 'Checkpoint', 'plan_checkpoint' : checkpoint.checkable_type == 'Plan' }"
      >{{ checkpoint.title }}</div>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      :class="{ 'checkpoint_content' : checkpoint.checkable_type == 'Plan'}"
    >
      <div class="checkpoint_description">{{ checkpoint.description }}</div>
      <v-expansion-panels
        v-if="getSubCheckpoints(checkpoint.id, 'Checkpoint')['id']!=checkpoint.id"
        accordion
      >
        <checkpoint
          v-for="(item,i) in getSubCheckpoints(checkpoint.id, 'Checkpoint')"
          :key="i"
          @click.native.stop="openCheckpoint(item.id)"
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
  components: {
    Checkpoint
  },
  methods: {
    ...mapActions(["updateMapPlaces"]),
    openCheckpoint(id) {
      let checkpoint = this.getCheckpoint(id);
      let subCheckpoints = this.getSubCheckpoints(id, "Checkpoint");
      if (subCheckpoints) {
        this.updateMapPlaces(subCheckpoints);
      } else this.updateMapPlaces(checkpoint);
    }
  },
  computed: {
    ...mapGetters(["getSubCheckpoints", "getCheckpoint"])
  }
};
</script>

<style lang="scss" scoped>
.checkpoint_title {
  font-size: 16px;
  position: relative;
}
.checkpoint_content {
  position: relative;
}
.checkpoint_content:before {
  content: "";
  position: absolute;
  top: -10px;
  left: -30px;

  width: 60px;
  z-index: 2;
  height: calc(100% + 10px);

  background: radial-gradient(circle, #000 2px, transparent 2px) top / 8px 8px
    repeat-y;
}

.plan_checkpoint::before {
  content: "";
  position: absolute;
  left: -35px;
  top: 50%;
  transform: translateY(-50%);

  width: 22px;
  height: 22px;

  background: url("https://image.flaticon.com/icons/svg/25/25615.svg") center /
    100% no-repeat;
}

.subcheckpoint {
    z-index: 222;
  position: relative;
}

.subcheckpoint::before {
  content: "";
  position: absolute;
  left: -35px;
  top: 50%;
  transform: translateY(-50%);

  width: 22px;
  height: 22px;
  background: radial-gradient(circle, red 7px, transparent 5px) center / 20px
    no-repeat;
}

.checkpoint_description {
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 15px;
  // border-bottom: 1px solid rgba(0, 0, 0, .2)
}
</style>