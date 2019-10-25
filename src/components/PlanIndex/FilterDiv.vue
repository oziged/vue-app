<template>
  <div class="filter_div">
    <span>{{ value.title }}</span>
    <div class="range_selectors">
      <v-text-field
        v-model="value.range[0]"
        :hide-details="true"
        single-line
        solo
        type="number"
        color="green"
        class="range_selector"
      ></v-text-field>
      <v-text-field
        v-model="value.range[1]"
        :hide-details="true"
        single-line
        solo
        type="number"
        color="green"
        class="range_selector"
      ></v-text-field>
    </div>
    <v-range-slider
      v-model="value.range"
      :max="value.max"
      :min="value.min"
      :hide-details="true"
      track-color="green"
      color="green"
      class="align-center"
    ></v-range-slider>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style lang="scss" scoped>
.filter_div {
  padding: 5px 12px;
  span {
    display: block;
    margin-bottom: 5px;
  }
}

.range_selectors {
  display: flex;
}
.range_selector {
  width: 40px;
  margin-left: 5px;
}
</style>