<template>
  <div class="plan_preview">
    <h3>{{ plan.title }}</h3>
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
    <!-- <truncate class="plan_description" clamp="..." :length="90" less="..." :text="plan.description"></truncate> -->
    <div class="plan_routes_list">
      <div class="plan_route" v-for="(item, index) in subCheckpoints" :key="index">
        <img class="circle" src="@/assets/PlanIndex/PlanPreview/circle.svg" alt />
        <div class="route_title">{{ item.title }}</div>
        <img class="arrow_right" src="@/assets/PlanIndex/PlanPreview/right-arrow.svg" alt />
      </div>
    </div>
    <div class="plan_route_bottom_info">
      <div class="left_block">
        <v-rating v-model="plan.rating" readonly background-color="green lighten-3" color="green"></v-rating>
      </div>
      <div class="right_block">
        <!-- {{ subCheckpoints.length }} -->
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
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";

// import truncate from "vue-truncate-collapsed";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["plan"],
  components: {
    // truncate
  },
  filters: {
    truncate(value) {
      return `${value.slice(0, 90)}...`;
    }
  },
  data() {
    return {
      subCheckpoints: [],
      fullDescription: false
    };
  },
  computed: {
    ...mapGetters(["getSubCheckpoints"])
  },
  methods: {},
  mounted() {
    this.subCheckpoints = this.getSubCheckpoints(this.plan.id, "Plan");
    window.h = () => {
      window.resizeTo(
        window.screen.availWidth / 2,
        window.screen.availHeight / 2
      );
    };

    document.querySelectorAll(".plan_description").forEach(item => {
      item.addEventListener("click", e => {});
    });
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
  &:hover {
    box-shadow: 0 0 5px 0px rgba(67, 175, 152, 0.226);
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
</style>