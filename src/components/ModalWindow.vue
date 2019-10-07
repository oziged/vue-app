<template>
  <transition :name="isMobile ? '' : 'zoom-in'">
    <div v-if="value" class="modal_bg">
      <div
        ref="modal_window"
        class="modal_window"
        :style="{width: width, height: height, overflowX: overflowX, overflowY: overflowY}"
        v-click-outside="inputConfig"
      >
        <div style="position: relative; width: 100%; height: 100%">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["value", "width", "height", "overflowX", "overflowY"],
  data() {
    return {
      inputConfig: {
        handler: this.inputHandler,
        middleware: this.inputMiddleware,
        events: ["click"]
      }
    };
  },
  mounted() {},
  methods: {
    inputHandler(e) {
      this.$emit("input", e);
    },
    inputMiddleware(e) {
      if (e.target.className == "gm-ui-hover-effect") return;
      let modals = document.querySelectorAll(".modal_window");
      if (this.$refs.modal_window == modals[modals.length - 1]) {
        return true;
      }
    }
  },
  computed: {
    ...mapGetters(["isMobile"])
  }
};
</script>

<style>
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all 0.5s;
}

.zoom-in-enter,
.zoom-in-leave-to {
  transform: scale(0);
  opacity: 0;
}
.modal_window {
  z-index: 100;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 90vw;
  height: 90vh;
  max-height: 90%;
  max-width: 1250px;
  overflow-y: auto;
}

.modal_bg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 1250px) {
  .modal_window {
    max-width: 90%;
  }
}
</style>