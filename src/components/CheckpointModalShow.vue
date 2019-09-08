<template>
  <v-dialog :value="value" @input="input" width="90vw">
    <v-card>
      <div class="left_block">
        {{ currentCheckpoint.title }}
        <div class="checkpoint_list_wrapper">
          <div class="checkpoints_list">
            <v-expansion-panels
              v-if="getSubCheckpoints(currentCheckpoint.id, 'Checkpoint')['id']!=currentCheckpoint.id"
              accordion
            >
              <checkpoint
                v-for="(item,i) in getSubCheckpoints(currentCheckpoint.id, 'Checkpoint')"
                :key="i"
                @click.native.stop="openCheckpoint(item.id)"
                :checkpoint="item"
              />
            </v-expansion-panels>
          </div>
        </div>
      </div>
      <div class="right_block">
        {{ currentCheckpoint.description }}
        <app-map style="width: 500px; height: 500px" />1
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";
import AppMap from "./AppMap";

export default {
  components: {
    AppMap,
    Checkpoint
  },
  props: ["value"],

  methods: {
    ...mapActions(["updateMapPlaces", "setCurrentCheckpoint"]),
    input(e) {
      this.$emit("input", e);
    },
    openCheckpoint(id) {
      let checkpoint = this.getCheckpoint(id);
      let subCheckpoints = this.getSubCheckpoints(id, "Checkpoint");
      if (subCheckpoints) {
        this.updateMapPlaces(subCheckpoints);
      } else this.updateMapPlaces(checkpoint);
      // this.setCurrentCheckpoint(id);
    }
  },
  computed: {
    ...mapGetters(["getSubCheckpoints", "currentCheckpoint", "getCheckpoint"])
  }
  // data() {
  // return {
  // dialog: true
  // }
  // },
};
</script>
  
<style lang="scss" scoped >
</style>