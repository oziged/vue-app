<template>
  <div>
    <filter-sort-header />
    <div class="plans_list">
    <magic-grid :gap="10" :maxColWidth="9999">
      <plan-preview v-for="(item, index) in allPlans" :key="index" :plan="item" />
    </magic-grid>
    </div>
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
    padding: 0 50px;
  }
</style>
