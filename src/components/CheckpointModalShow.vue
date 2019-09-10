<template>
  <v-dialog :value="value" @input="input" width="90vw">
    <v-card class="checkpoint_modal">
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
                :checkpoint="item"
              />
            </v-expansion-panels>
          </div>
        </div>
      </div>
      <div class="right_block">
        {{ currentCheckpoint.description }}
        {{ currentCheckpoint }}
        <app-map style="width: 500px; height: 500px" :checkpointId="checkpointId" />
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
  data() {
    return {
      checkpointId: null
    };
  },
  methods: {
    ...mapActions(["updateMapPlaces", "setCurrentCheckpoint"]),
    input(e) {
      this.$emit("input");
    },
    setCheckpointId(id) {
      this.checkpointId = id;
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },
  mounted() {},
  watch: {
    value() {
      this.checkpointId = null;
      console.log(this.checkpointId + "///");
      this.$nextTick(() => {
        this.checkpointId = this.getPlanModalCheckpointId;
        console.log(this.checkpointId + "///");
        console.log(this.getPlanModalCheckpointId + "///");
      });
    }
  },
  computed: {
    currentCheckpoint() {
      return this.getCheckpoint(this.getPlanModalCheckpointId);
    },
    ...mapGetters([
      "getSubCheckpoints",
      "getCheckpoint",
      "getPlanModalCheckpointId",
      "planCheckpointModalDisplay"
    ])
  }
};
</script>
  
<style lang="scss" scoped>
.checkpoint_modal {
  display: flex;
  .left_block {
    width: 30%;
    height: 200%;
    background-color: border 1px solid red;
  }
  .right_block {
    width: 70%;
  }
}
</style>