<template>
  <div class="plan_preview">
    <router-link :to="`plan/${plan.id}`" style="display: block; width: fit-content">
      <h3 style="display: block; width: fit-content">{{ plan.title }}</h3>
    </router-link>

    <p
      v-if="fullDescription"
      @click="fullDescription = !fullDescription"
      class="plan_description"
    >{{ plan.description }}</p>
    <p
      v-else
      class="plan_description"
      @click="fullDescription = !fullDescription"
    >{{ plan.description | truncate }}</p>
    <div class="plan_routes_list">
      <div class="plan_route" v-for="(item, index) in subCheckpoints" :key="index">
        <img class="circle" src="@/assets/PlanIndex/PlanPreview/circle.svg" alt />
        <div class="route_title">{{ item.title }}</div>
        <img class="arrow_right" src="@/assets/PlanIndex/PlanPreview/right-arrow.svg" alt />
      </div>
    </div>
    <div class="plan_route_bottom_info">
      <div class="left_block">
        <v-rating v-model="fav" full-icon="mdi-heart" empty-icon="mdi-heart-outline" clearable length="1" background-color="green lighten-3" color="green"></v-rating>
        <hr style="opacity: .2; margin: 10px 10px; height: 20px;">
        <v-rating :value="plan.rating" readonly background-color="green lighten-3" color="green"></v-rating>
      </div>
      <div class="right_block">
        <span v-if="subCheckpoints">{{ subCheckpoints.length }}</span>
        <img
          class="circle"
          style="margin: 0 5px;"
          src="@/assets/PlanIndex/PlanPreview/circle.svg"
          alt
        />
        {{ plan.length }}km
      </div>
    </div>
  </div>
</template>

<script>
import {
  TweenMax,
  CSSPlugin,
  ScrollToPlugin,
  Draggable,
  Elastic
} from "gsap/all";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["plan"],
  components: {
  },
  filters: {
    truncate(value) {
      return `${value.slice(0, 90)}...`;
    }
  },
  data() {
    return {
      // subCheckpoints: [],
      fullDescription: false,
      fav: 0
    };
  },
  computed: {
    ...mapGetters(["getSubCheckpoints"]),
    subCheckpoints() {
      return this.getSubCheckpoints(this.plan.id, 'Plan')
    }
  },
  methods: {},
  mounted() {
    window.fav = () => {
      return this.fav
    };
  },
  watch: {
    fullDescription() {
      this.$nextTick(() => {
        window.dispatchEvent(new Event("resize"));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.plan_preview {
  width: calc((100% - 30px) / 3);
  min-width: 250px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 5px 0px rgba(67, 175, 152, 0.226);
  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
}

.plan_description {
  margin-bottom: 5px;
}

.plan_routes_list {
  display: flex;
  flex-wrap: wrap;
}

.plan_route {
  display: flex;
  align-items: center;
  &:last-child {
    .arrow_right {
      display: none;
    }
  }
  &_bottom_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left_block {
      display: flex;
      align-items: center;
    }
    .right_block {
      display: flex;
      align-items: center;
    }
  }
}

.circle {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.arrow_right {
  margin: 0 5px;
}

.route_title {
  font-size: 16px;
}

@media (max-width: 895px) {
  .plan_preview {
    width: calc((100% - 20px) / 2);
  }
}

@media (max-width: 635px) {
  .plan_preview {
    width: 100%;
  }
}
</style>

<style lang="scss">
.plan_preview .v-rating {
  margin: 5px 0;
  .v-icon {
    padding: 0;
  }
}
.v-application .plan_preview a {
  color: black;
}
</style>