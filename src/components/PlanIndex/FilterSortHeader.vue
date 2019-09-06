<template>
  <div class="filter_sort_header">
    <div class="right_block">
      <img @click="test" class="search_img" src="@/assets/FilterSortHeader/search.png" alt />
      <img
        @click="displaySearchInput = !displaySearchInput"
        class="search_img"
        src="@/assets/FilterSortHeader/search.png"
        alt
      />
      <transition name="search">
        <v-text-field
          autofocus
          class="search_input"
          v-if="displaySearchInput"
          color="green"
          outlined
          hide-details
        ></v-text-field>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [{ title: "1" }, { title: "2" }, { title: "" }],
      displaySearchInput: false
    };
  },
  methods: {
    test() {
      console.log("123");
      this.displaySearchInput = !this.displaySearchInput;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter_sort_header {
  display: flex;
  align-items: center;
  height: 75px;
  padding: 0 50px;
  .right_block {
    width: 60%;
    position: relative;
    .search_img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 50%;
      z-index: 100;
      transform: translateY(-50%);
    }
  }
}

.search-enter-active,
.search-leave-active {
  transition: all 0.5s;
}

.search-enter,
.search-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>

<style lang="scss">
.search_input {
  height: 40px;
  .v-input__control,
  .v-input__slot,
  .v-text-field__slot,
  .v-input__slot,
  fieldset {
    height: 40px;
  }
  legend {
    height: 20px;
  }
  .v-text-field--outlined .v-input__control .v-input__slot {
      min-height: 40px;
      height: 40px;
  }
}
</style>
