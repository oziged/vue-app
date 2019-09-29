<template>
  <div class="about_wrapper">
    <div class="about">
      <h1>about us page</h1>hello tha'ts some contnt
      <div class="canvas"></div>
    </div>
  </div>
</template>

<script>
import fragShader from '../components/test.glsl'
export default {
  mounted() {
 }
};
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  clip-path: circle(0% at center);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 80px);
  transition: 2s ease;
  background-color: rgb(243, 243, 243);
}

.about_wrapper {
  //   height: 100%;
  width: 100%;
}

.canvas {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>