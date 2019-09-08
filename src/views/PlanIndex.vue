<template>
  <div style="transition-delay: .1s">
    <filter-sort-header class="filter_sort_header"/>
    <!-- <div class="plans_list"> -->
    <magic-grid class="plans_list" :gap="10" :maxColWidth="9999">
      <plan-preview v-for="(item, index) in allPlans" :key="index" :plan="item" />
    </magic-grid>
    <!-- </div> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FilterSortHeader from "../components/PlanIndex/FilterSortHeader";
import PlanPreview from "../components/PlanIndex/PlanPreview";

export default {
  components: {
    FilterSortHeader,
    PlanPreview
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["allPlans", "currentPlans"])
  }
};
</script>

<style lang="scss" scoped>
  .plans_list {
    position: relative;
    margin: 0 50px;
  }

  .filter_sort_header {
    margin: 30px 50px;
  }
</style>
