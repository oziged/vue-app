<template>
  <v-expansion-panel>
    <v-expansion-panel-header>{{ checkpoint.title }}</v-expansion-panel-header>
    <v-expansion-panel-content>
      {{ checkpoint.description }}
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

<style lang="scss">
/* VUETIFY STYLES FIX */

.v-expansion-panel {
  .v-expansion-panel-content__wrap {
    padding: 0;
    .v-expansion-panel-header {
    }
  }
}
</style>>