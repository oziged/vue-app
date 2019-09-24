<template>
  <v-app>
    <div>
      <app-header />
      <transition name="router-anim" mode="out-in">
        <router-view class="router_content" :key="$route.fullPath"></router-view>
      </transition>
    </div>
    <checkpoint-modal-show :value="mainCheckpointModalDisplay" @input="toggleMainCheckpointModal" />
    <checkpoint-new :value="newCheckpointModalDisplay" @input="toggleNewCheckpointModal" />
    <checkpoint-edit :value="editCheckpointModalDisplay" @input="toggleEditCheckpointModal" />
    <notifications style="bottom: 30px;" position="center bottom" group="foo" />
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import CheckpointModalShow from "./components/CheckpointModalShow";
import CheckpointNew from "./components/CheckpointNew";
import CheckpointEdit from './components/CheckpointEdit';
import { mapGetters, mapActions } from "vuex";
import ModalWindow from "./components/ModalWindow";

export default {
  name: "App",
  components: {
    AppHeader,
    CheckpointModalShow,
    CheckpointNew,
    CheckpointEdit,
    ModalWindow
  },
  methods: {
    ...mapActions([
      "toggleMainCheckpointModal",
      "toggleNewCheckpointModal",
      "updateCurrentLocation",
      "toggleEditCheckpointModal"
    ])
  },
  mounted() {
    this.updateCurrentLocation();
  },
  computed: {
    ...mapGetters(["mainCheckpointModalDisplay", "newCheckpointModalDisplay", "editCheckpointModalDisplay"])
  }
};
</script>

<style lang="scss">
.router-anim-enter-active,
.router-anim-leave-active {
  transition: all .6s;
}

.router-anim-enter {
  transform: translateY(-100%);
}

.router-anim-leave-to {
  transform: translateY(100%);
}

.router-anim-enter, 
.router-anim-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  background-color: white;
}
.router_content {
  margin: 0 auto;
  max-width: 1250px;
  padding: 20px 0;
}

* {
  box-sizing: border-box;
}

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 4px rgba(145, 145, 145, 0.3);
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #14e71e5e;
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

.v-file-input .v-input__slot {
  margin-left: -32px;
  width: calc(100% + 32px);
}
</style>
