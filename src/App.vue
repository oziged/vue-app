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
    <plan-new :value="newPlanModalDisplay" @input="toggleNewPlanModal" />
    <plan-modal-edit :value="editPlanModalDisplay" @input="toggleEditPlanModal" />
    <mobile-map-modal :value="mobileMapModalDisplay" @input="toggleMobileMapModal" />

    <transition name="fade">
      <performance-check v-if="!performanceLvl"/>
    </transition>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import CheckpointModalShow from "./components/CheckpointModalShow";
import CheckpointNew from "./components/CheckpointNew";
import CheckpointEdit from "./components/CheckpointEdit";
import PlanNew from './components/PlanNew'
import PlanModalEdit from "./components/PlanModalEdit";
import MobileMapModal from "./components/MobileMapModal";
import { mapGetters, mapActions } from "vuex";
import ModalWindow from "./components/ModalWindow";
import TweenMax from "gsap";
import PerformanceCheck from './components/PerfomanceCheck'

export default {
  name: "App",
  components: {
    AppHeader,
    CheckpointModalShow,
    CheckpointNew,
    CheckpointEdit,
    PlanNew,
    PlanModalEdit,
    MobileMapModal,
    ModalWindow,
    PerformanceCheck
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

      TweenMax.from(el, 1 - delay, {
        opacity: 0,
        x: "-300px",
        delay: delay,
        clearProps: "scale"
      });
    },

    beforeLeave(el) {
      if (this.isMobile) return;
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
      "addPlace",
      "setCurrentPlan",
      "newCheckpoint",
      "toggleNewPlanModal"
    ])
  },
  watch: {},
  mounted() {
    console.log(this.newPlanModalDisplay);
    let path = localStorage.getItem("path");
    if (path) {
      this.$router.push(path);
      localStorage.removeItem("path");
    }
    this.updateCurrentLocation();
    this.setWindowWidth();
    window.addEventListener("resize", () => {
      this.setWindowWidth();
    });
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
      "allPlaces",
      "performanceLvl",
      "newPlanModalDisplay"
    ])
  }
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

button {
  outline: none;
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
    padding-top: 100px;
    margin: 0 auto;
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

#app.v-application a {
  color: black;
  text-decoration: none;
}

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

.disable_cursor {
  #app, #app a, button, div {
    cursor: none!important;
  }
}
</style>
