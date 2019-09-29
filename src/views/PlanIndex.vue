<template>
  <div style="padding-top: 20px; margin: 0 auto;
    max-width: 1250px;">
    <filter-sort-header class="filter_sort_header"/>
    <magic-grid class="plans_list" :gap="10" :maxColWidth="9999">
      <plan-preview v-for="(item, index) in allPlans" :key="index" :plan="item" />
    </magic-grid>
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
    ...mapGetters(["allPlans"])
  }
};
</script>

<style lang="scss" scoped>
  .plans_list {
    position: relative;
    margin: 0 0;
  }

</style>
