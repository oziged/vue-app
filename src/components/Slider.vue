<template>
  <div class="slider">
    <slot/>
    <slick class="main_slider" ref="slickMain" :options="slickOptionsMain">
      <div v-if="!disableMap" class="main_slide">
        <app-map
          ref="map"
          class="map"
          :displayedItemId="displayedItemId"
          :displayedItemType="displayedItemType"
        />
      </div>
      <div v-for="(item, index) in images" :key="index" class="main_slide">
        <img :src="item" alt />
      </div>
    </slick>

    <slick class="sub_slider" ref="slickSub" :options="slickOptionsSub">
      <div v-if="!disableMap" class="sub_slide_wrapper">
        <div class="sub_slide">
          <img
            src="https://previews.123rf.com/images/microone/microone1710/microone171000578/88774135-prospettiva-3d-mappa-della-citt%C3%A0-con-puntatori-pin-concetto-di-vettore-di-navigazione-gps-abstarct-ill.jpg"
            alt
          />
        </div>
      </div>
      <div class="sub_slide_wrapper" v-for="(item, index) in images" :key="index">
        <div class="sub_slide">
          <img :src="item" alt />
        </div>
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
    document.querySelectorAll(".main_slide").forEach(item => {
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
  .map {
    width: 100%;
    height: 100%;
  }
  .main_slide {
    box-shadow: inset 0 0 9px #00000021;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.slick_active {
}

.sub_slider {
  height: 100px;
  overflow: hidden;
  .sub_slide {
    transition: 1s;
    border: 5px solid rgb(221, 237, 214);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .slick-current .sub_slide {
    transition: 1s;
    border: 5px solid rgb(138, 210, 116);
  }
}

.main_slide {
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