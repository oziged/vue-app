<template>
  <v-app>
    <div>
      <app-header />
      <transition name="router-anim" mode="out-in">
        <router-view class="router_content" :key="$route.fullPath"></router-view>
      </transition>
    </div>
    <checkpoint-modal-show :value="planCheckpointModalDisplay" @input="toggleCheckpointModal" />
    <checkpoint-new :value="true" />
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import CheckpointModalShow from "./components/CheckpointModalShow";
import CheckpointNew from "./components/CheckpointNew";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    AppHeader,
    CheckpointModalShow,
    CheckpointNew
  },
  methods: {
    ...mapActions(["toggleCheckpointModal"])
  },
  mounted() {},
  computed: {
    ...mapGetters(["planCheckpointModalDisplay"])
  }
};
</script>

<style lang="scss">
.router-anim-enter-active,
.router-anim-leave-active {
  transition: all 0.3s;
}

.router-anim-enter,
.router-anim-leave-to {
  opacity: 0;
}

#app {
  background-color: white;
}

* {
  box-sizing: border-box;
}

/* VUETIFY STYLES FIX */

.checkpoints_list {
  .v-expansion-panel {
    .v-expansion-panel-content__wrap {
      padding: 0;
      .v-expansion-panel-header {
      }
    }
  }

  .v-dialog .v-dialog--active {
    overflow: hidden;
  }

  .v-expansion-panel--active .v-expansion-panel-header {
    min-height: 40px;
  }

  .v-expansion-panel:before {
    box-shadow: none;
  }
  .v-expansion-panel-header {
    padding-bottom: 0;
    padding-top: 0;
  }
}
</style>
