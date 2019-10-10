<template>
  <v-app>
    <div>
      <app-header ref="header" />
      <transition
        appear
        :duration="{leave: isMobile ? 0 : leave}"
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
      leave: 1000,
      nextPath: null,
      prevPath: null
    };
  },
  methods: {
    beforeEnter: function(el) {
      if (this.isMobile) return;
      let delay = 0;
      let duration = 1;

      if (this.$route.path.includes("plans")) {
        TweenMax.from(el, 0.8, {
          opacity: 0,
          y: "-100%",
          delay: 0.2,
          clearProps: "scale"
        });
      }
      if (this.$route.path.includes("about")) {
        this.$nextTick(() => {
          TweenMax.to(".about_wrapper", 1.5, {
            backgroundColor: "rgb(191, 215, 206)",
            delay: 0.5,
            clearProps: "scale"
          });
          TweenMax.to(".about", 2, {
            webkitClipPath: "circle(100% at center)",
            delay: 2,
            clearProps: "scale"
          });
        });
      } else {
        TweenMax.from(el, 1, {
          opacity: 0,
          y: "-100%",
          clearProps: "scale"
        });
      }
    },
    beforeLeave: function(el) {
      if (this.isMobile) return;
      if (this.$route.path.includes("about")) {
        if (this.prevPath.includes("plan")) {
          TweenMax.to(".plan_info", 1, {
            opacity: 0,
            x: "-100%",
            ease: Power3.easeInOut,
            delay: 0.2,
            clearProps: "scale"
          });
          TweenMax.to(".plan_map", 1, {
            opacity: 0,
            x: "100%",
            ease: Power3.easeInOut,
            delay: 0.7,
            clearProps: "scale"
          });
        }
      } else {
        TweenMax.to(el, 1, {
          opacity: 0,
          y: "100%",
          ease: Power3.easeOut,
          clearProps: "scale"
        });
      }

      this.leave = 1000;
    },
    ...mapActions([
      "toggleMainCheckpointModal",
      "toggleNewCheckpointModal",
      "updateCurrentLocation",
      "toggleEditCheckpointModal",
      "toggleEditPlanModal",
      "setWindowWidth",
      "toggleMobileMapModal"
    ])
  },
  mounted() {
    this.updateCurrentLocation();
    this.setWindowWidth();
    window.addEventListener("resize", () => {
      this.setWindowWidth();
    });
  },
  watch: {
    $route(next, prev) {
      if (next.path.includes("about")) this.leave = 2000;
      this.nextPath = next.path;
      this.prevPath = prev.path;
    }
  },
  computed: {
    ...mapGetters([
      "mainCheckpointModalDisplay",
      "newCheckpointModalDisplay",
      "editCheckpointModalDisplay",
      "editPlanModalDisplay",
      "windowWidth",
      "mobileMapModalDisplay",
      "isMobile"
    ])
  }
};
</script>

<style lang="scss">
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
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

input[type="submit"]{
   outline:none;
}

// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 4px rgba(145, 145, 145, 0.3);
//   background-color: #f5f5f5;
// }

// ::-webkit-scrollbar {
//   width: 4px;
//   background-color: #f5f5f5;
// }

// ::-webkit-scrollbar-thumb {
//   background-color: #14e71e5e;
// }

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
