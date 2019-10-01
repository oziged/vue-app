<template>
    <!-- <vue-scroll :style="{width: value == true ? 'auto' : 0}"> this style added to save smooth animation open/close modal -->
  <transition name="zoom-in">
    <div v-if="value" class="modal_bg">
      <div class="modal_window" :style="{width: width, height: height, overflowX: overflowX, overflowY: overflowY}" v-click-outside="input">
        <div style="position: relative; width: 100%; height: 100%">
        <slot></slot>
        </div>
      </div>
    </div>
  </transition>
    <!-- </vue-scroll> -->
</template>

<script>
export default {
  props: ["value", "width", "height", "overflowX", "overflowY"],
  mounted() {},
  methods: {
    input(e) {
      if (e.target.className == "gm-ui-hover-effect") return;
      this.$emit("input", false);
    }
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
  /* position: fixed; */
  z-index: 100;
  /* left: 50%; */
  /* top: 50%; */
  /* transform: translate(-50%, -50%); */
  
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  height: 90%;
  max-height: 90%;
  max-width: 90%;
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
</style>