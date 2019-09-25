<template>
  <div style="padding-top: 20px;     margin: 0 auto;
    max-width: 1250px;">
    <plan :id="$route.params.id" />
  </div>
</template>

<script>
import Plan from "../components/Plan";

export default {
  components: {
    Plan
  }
};
</script>

<style>
</style>