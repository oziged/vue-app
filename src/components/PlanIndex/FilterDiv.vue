<template>
  <div style="padding: 5px 12px;">
    <span style="display:block; margin-bottom: 5px;">{{ value.title }}</span>
    <div class="range_selectors" style="display: flex">
      <v-text-field
        v-model="value.range[0]"
        :hide-details="true"
        single-line
        solo
        type="number"
        color="green"
        style="width: 40px; align=center; margin-right: 5px"
        class="range_selector"
      ></v-text-field>
      <v-text-field
        v-model="value.range[1]"
        :hide-details="true"
        single-line
        solo
        type="number"
        color="green"
        style="width: 40px; align=center; margin-left: 5px;"
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

<style>
</style>