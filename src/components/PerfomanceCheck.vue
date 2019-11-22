<template>
  <div>
    <span>l</span>
    <span>o</span>
    <span>a</span>
    <span>d</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    checkPerformance() {
      let start = performance.now();
      let counter = 0;
      while(counter < 10000) {
        counter++;
      }
      let time = performance.now() - start;
      if (time < 1) {
        setTimeout(() => {
          this.$store.commit('setPerformanceLvl', 100 - (time*100));
        }, 3000);
      } else this.$store.commit('setPerformanceLvl', 100 - (time*100));
    }
  },
  mounted() {
    this.checkPerformance();
  },
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: black;
  z-index: 999;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  span {
    color: black;
    text-transform: uppercase;
    font-family: Monsterrat;
    font-size: 20px;
    opacity: 0.2;
    animation: flicker 2.75s infinite;
    animation-timing-function: ease-in;
    &:first-child {animation-delay: 0.25s}
    &:nth-child(2) {animation-delay: 0.5s}
    &:nth-child(3) {animation-delay: 0.75s}
    &:nth-child(4) {animation-delay: 1s}
    &:nth-child(5) {animation-delay: 1.25s}
    &:nth-child(6) {animation-delay: 1.5s;}
    &:nth-child(7) {animation-delay: 1.75s;}
  }
}

@keyframes flicker {
  0%, 35%, 65%, 100% {opacity: 0.2}
  50% {opacity: 1}
}

</style>