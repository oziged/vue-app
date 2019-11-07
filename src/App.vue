<template>
  <v-app>
    <div>
      <app-header ref="header" />
      <transition
        appear
        :duration="{leave: isMobile ? 0 : transitionDuration}"
        @before-enter="beforeEnter"
        @before-leave="beforeLeave"
        mode="out-in"
      >
        <router-view class="router_content" :key="$route.fullPath"></router-view>
      </transition>
    </div>
    <checkpoint-modal-show :value="mainCheckpointModalDisplay" @input="toggleMainCheckpointModal" />
    <checkpoint-new :value="newCheckpointModalDisplay" @input="toggleNewCheckpointModal" />
    <checkpoint-edit :value="editCheckpointModalDisplay" @input="toggleEditCheckpointModal" />
    <plan-modal-edit :value="editPlanModalDisplay" @input="toggleEditPlanModal" />
    <mobile-map-modal :value="mobileMapModalDisplay" @input="toggleMobileMapModal" />
    <notifications style="bottom: 30px;" position="center bottom" group="foo" />
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import CheckpointModalShow from "./components/CheckpointModalShow";
import CheckpointNew from "./components/CheckpointNew";
import CheckpointEdit from "./components/CheckpointEdit";
import PlanModalEdit from "./components/PlanModalEdit";
import MobileMapModal from "./components/MobileMapModal";
import { mapGetters, mapActions } from "vuex";
import ModalWindow from "./components/ModalWindow";
import TweenMax from "gsap";

export default {
  name: "App",
  components: {
    AppHeader,
    CheckpointModalShow,
    CheckpointNew,
    CheckpointEdit,
    PlanModalEdit,
    MobileMapModal,
    ModalWindow
  },
  data() {
    return {
      transitionDuration: 1000
    };
  },
  methods: {
    beforeEnter(el) {
      if (this.isMobile) return;
      document.querySelector("#app").classList.add("before_leave"); // fix scrollbar during transition
      setTimeout(() => {
        document.querySelector("#app").classList.remove("before_leave"); // unfix scrollbar after transition
      }, this.transitionDuration);

      let delay = this.$route.path.includes("plans") ? 0.3 : 0;
      // animation
      TweenMax.from(el, 1 - delay, {
        opacity: 0,
        x: "-300px",
        delay: delay,
        clearProps: "scale"
      });
    },

    beforeLeave(el) {
      if (this.isMobile) return;
      // animation
      TweenMax.to(el, 1, {
        opacity: 0,
        x: "300px",
        ease: Power3.easeOut,
        clearProps: "scale"
      });
    },
    ...mapActions([
      "toggleMainCheckpointModal",
      "toggleNewCheckpointModal",
      "updateCurrentLocation",
      "toggleEditCheckpointModal",
      "toggleEditPlanModal",
      "setWindowWidth",
      "toggleMobileMapModal",
      "addPlace","setCurrentPlan", "addCheckpoint"
    ])
  },
  mounted() {
    let path = localStorage.getItem('path');
    if (path) {
      this.$router.push(path);
      localStorage.removeItem('path');
    }
    this.updateCurrentLocation();
    this.setWindowWidth();
    window.addEventListener("resize", () => {
      this.setWindowWidth();
    });
    window.t = this;
  },
  computed: {
    ...mapGetters([
      "mainCheckpointModalDisplay",
      "newCheckpointModalDisplay",
      "editCheckpointModalDisplay",
      "editPlanModalDisplay",
      "windowWidth",
      "mobileMapModalDisplay",
      "isMobile",
      "allPlaces"
    ])
  }
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  .router_content {
    margin-top: 100px;
    margin: 100px auto 0 auto;
  }
}

* {
  box-sizing: border-box;
}

input[type="submit"] {
  outline: none;
}

.before_leave {
  max-height: 100vh;
  overflow: hidden;
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

.v-application a {
  cursor: none!important;
}

.v-file-input .v-input__slot {
  margin-left: -32px;
  width: calc(100% + 32px);
}
</style>
