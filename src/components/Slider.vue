<template>
  <div class="slider">
    <slick class="main_slider" ref="slickMain" :options="slickOptionsMain">
      <div v-if="!disableMap" class="slide">
        <app-map
          ref="map"
          style="width: 100%; height: 100%"
          :displayedItemId="displayedItemId"
          :displayedItemType="displayedItemType"
        />
      </div>
      <div
        v-for="(item, index) in images"
        :key="index"
        class="slide"
        :style="{background: `url('${item}') no-repeat center center/cover`}"
      ></div>
    </slick>

    <slick class="sub_slider" ref="slickSub" :options="slickOptionsSub">
      <div v-if="!disableMap" class="sub_slide_wrapper">
        <div
          class="sub_slide"
          style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center"
        ></div>
      </div>
      <div class="sub_slide_wrapper" v-for="(item, index) in images" :key="index">
        <div
          class="sub_slide"
          :style="{background: `url('${item}') no-repeat center center/cover`}"
        >{{ index }}</div>
      </div>
    </slick>
  </div>
</template>

<script>
import AppMap from "./AppMap";
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";

export default {
  props: [
    "displayedItemId",
    "displayedItemType",
    "slickOptionsMain",
    "slickOptionsSub",
    "images",
    "disableMap"
  ],
  components: {
    AppMap,
    Slick
  },
  methods: {},
  mounted() {
    document.querySelectorAll(".slide").forEach(item => {
      item.parentElement.style.height = "100%";
      item.parentElement.style.width = "100%";
    });
  }
};
</script>

<style lang="scss">
.slider {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  justify-content: space-between;
}

.main_slider {
  width: 100%;
  height: calc(100% - 120px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 4px 0px rgba((0), 0, 0, 0.1);
}

.slick_active {
}

.sub_slider {
  height: 100px;
  overflow: hidden;
  .sub_slide {
    transition: 1s;
    border: 5px solid rgb(221, 237, 214);
  }
  .slick-current .sub_slide {
    transition: 1s;
    border: 5px solid rgb(138, 210, 116);
  }
}

.slide {
  width: 100%;
  height: 100%;
}

.sub_slide_wrapper {
  width: 100%;
  height: 100px;
  .sub_slide {
    width: calc(100% - 5px);
    height: 100%;
  }
}
</style>