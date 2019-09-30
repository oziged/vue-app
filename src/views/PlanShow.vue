<template>
  <div class="wrapper" style="padding-top: 20px; margin: 0 auto; max-width: 1250px;">
    <plan :id="$route.params.id" />
  </div>
</template>

<script>
import Plan from "../components/PlanShow/Plan";

export default {
  components: {
    Plan
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 1300px) {
  .wrapper {
    padding: 0 20px;
  }
}
</style>