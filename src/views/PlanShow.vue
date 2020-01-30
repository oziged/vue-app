<template>
  <div class="wrapper">
    <plan />
  </div>
</template>

<script>
import Plan from "../components/PlanShow/Plan";

export default {
  components: {
    Plan
  },


  created() {
    
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1250px;
}
@media (max-width: 1300px) {
  .wrapper {
    padding: 0 20px;
  }
}
</style>