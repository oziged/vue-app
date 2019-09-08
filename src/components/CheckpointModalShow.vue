<template>
  <v-dialog :value="value" @input="input" width="90vw">
    <v-card>
      <div class="left_block">
        {{ currentCheckpoint.title }}
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
      <div class="right_block">{{ currentCheckpoint.description }}</div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";

export default {
  components: {
    Checkpoint
  },
  props: ["value"],

  methods: {
    input(e) {
      this.$emit("input", e);
    }
  },
  computed: {
    ...mapGetters(["getSubCheckpoints", "currentCheckpoint"])
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