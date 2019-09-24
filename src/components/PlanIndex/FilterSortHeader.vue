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
        <div
          v-if="displayFilterSortModal"
          class="filter_sort_modal"
          v-click-outside="hideFilterSortModal"
        >
          <h4 class="modal_header">Sort/Filter Settings</h4>
          <v-select
            v-model="selectedFilter"
            :items="items"
            :hide-details="true"
            filled
            background-color="white"
            color="green"
            label="Sort settings:"
            style="margin-bottom: 5px;"
          ></v-select>
          <filter-div v-for="(item, index) in filters" v-model="filters[index]" :key="index" />
        </div>
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
          v-click-outside="hideSearchInput"
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
import vClickOutside from "v-click-outside";
import { mapGetters, mapActions } from "vuex";
import FilterDiv from "./FilterDiv";

export default {
  components: {
    FilterDiv
  },
  data() {
    return {
      items: [
        "From min rating",
        "From max rating",
        "From min price",
        "From max price",
        "From min distance",
        "From max distance"
      ],
      filters: [
        {
          title: "Distance",
          min: 0,
          max: 4000,
          range: [0, 4000]
        },
        {
          title: "Price",
          min: 0,
          max: 100,
          range: [0, 100]
        },
        {
          title: "Rating",
          min: 50,
          max: 2000,
          range: [50, 2000]
        }
      ],
      distanceMin: 0,
      distanceMax: 5000,
      distanceRange: [0, 5000],
      displaySearchInput: false,
      displayFilterSortModal: false,
      selectedFilter: null
    };
  },
  watch: {
    filters: {
      handler: function (val, oldVal) {
      	console.log('changed');
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    hideFilterSortModal(event) {
      this.displayFilterSortModal = false;
    },
    hideSearchInput(event) {
      this.displaySearchInput = false;
    }
  },
  mounted() {
    window.test = () => {
      return this.filters[0].range
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
};
</script>

<style lang="scss" scoped>
.filter_sort_header {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  height: 60px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .left_block {
    height: 100%;
    width: 40%;
    position: relative;
    .filter_sort_modal {
      width: 300px;
      height: 500px;
      position: absolute;
      top: 90px;
      left: 0;
      z-index: 100;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
      border-radius: 8px;
      .modal_header {
        padding: 12px;
        margin: 0;
        font-weight: 400;
        border-bottom: 1px solid #e5e5e5;
      }
    }
    .filter_sort_modal_img {
      width: 30px;
      height: 30px;
      position: absolute;
      cursor: pointer;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
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
  opacity: 0;
  .search-enter-active,
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
.range_selector {
  input {
    text-align: center;
  }
  .v-input__control .v-input__slot {
    padding: 0 !important;
  }
}
</style>