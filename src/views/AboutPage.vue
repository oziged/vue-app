<template>
  <div class="about_wrapper">
    <div class="about">
      <h1>about us page</h1>hello tha'ts some contnt
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about {
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
</style>