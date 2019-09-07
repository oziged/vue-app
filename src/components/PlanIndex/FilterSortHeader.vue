<template>
  <div class="filter_sort_header">
    <div class="left_block">
      <img
        @click="displayFilterSortModal = !displayFilterSortModal"
        class="filter_sort_modal_img"
        src="@/assets/FilterSortHeader/filter_sort_modal.png"
        alt
      />
      <transition name="filter">
        <div v-if="displayFilterSortModal" class="filter_sort_modal"></div>
      </transition>
    </div>
    <div class="right_block">
      <img
        @click="displaySearchInput = !displaySearchInput"
        class="search_img"
        src="@/assets/FilterSortHeader/search.png"
        alt
      />
      <transition name="search">
        <v-text-field
          v-if="displaySearchInput"
          autofocus
          class="search_input"
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
      displaySearchInput: false,
      displayFilterSortModal: false
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.filter_sort_header {
  display: flex;
  align-items: center;
  height: 75px;
  padding: 0 50px;
  .left_block {
    height: 100%;
    width: 40%;
    position: relative;
    .filter_sort_modal {
      width: 70%;
      height: 500px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      box-shadow: 0 0 4px 1px green;
    }
    .filter_sort_modal_img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      left: 20px;
      top: 20px;
      // transform: translateY(calc(-50% + 50px));
    }
    .filter_sort_modal {
      position: absolute;
      left: 0px;
      top: 80px;
    }
  }
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

.filter-enter-active,
.filter-leave-active {
  transition: all 0.5s;
}

.filter-enter,
.filter-leave-to {
  transform: translateY(-50px);
  opacity: 0;.search-enter-active,
.search-leave-active {
  transition: all 0.5s;
}

.search-enter,
.search-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
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
