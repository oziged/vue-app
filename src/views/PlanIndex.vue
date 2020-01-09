<template>
  <div class="wrapper">
    <filter-sort-header class="filter_sort_header" />
    <transition name="fade">
      <magic-grid v-if="displayed" class="plans_list" :gap="10" :maxColWidth="9999">
        <plan-preview v-for="(item, index) in allPlans" :key="index" :plan="item" />
      </magic-grid>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import FilterSortHeader from "../components/PlanIndex/FilterSortHeader";
import PlanPreview from "../components/PlanIndex/PlanPreview";
import axios from 'axios'

export default {
  components: {
    FilterSortHeader,
    PlanPreview
  },


  data() {
    return {
      displayed: true
    };
  },


  computed: {
    ...mapGetters(["allPlans"]),
  },


  methods: {
    ...mapMutations(["setAllPlans"]),
  },


  mounted() {
    axios.get('http://localhost:3000/api/plans')
    .then(response => {
      this.setAllPlans(response.data);
    })
  },

  watch: {
    allPlans() {
      this.displayed = false;
      setTimeout(() => {
        this.displayed = true;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.plans_list {
  position: relative;
  margin: 0 0;
}
.wrapper {
  max-width: 1250px;
}

@media (max-width: 1300px) {
  .wrapper {
    padding: 0 20px;
  }
}
</style>
