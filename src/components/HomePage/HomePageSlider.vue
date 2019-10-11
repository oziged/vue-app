<template>
  <div class="home_page_slider" ref="slider">
    <div class="current_slide">
      <slot></slot>
    </div>
    <div class="navigation_circles">
      <div
        class="circle"
        v-for="(item, index) in $slots.default"
        :key="index"
        :class="{active_circle: index == currentSlide}"
        @click="animating ? '' : currentSlide = index"
      ></div>
    </div>
    <div class="navigation_arrows">
      <svg id="left" @click="animating ? '' : changeSlideDown()" viewBox="0 0 476.213 476.213">
        <polygon
          fill="inherit"
          points="347.5,324.393 253.353,418.541 253.353,0 223.353,0 223.353,419.033 128.713,324.393 107.5,345.607 
	238.107,476.213 368.713,345.606 "
        />
      </svg>
      <div class="separator"></div>
      <svg id="right" @click="animating ? '' : changeSlideUp()" viewBox="0 0 476.213 476.213">
        <polygon
          fill="inherit"
          points="347.5,324.393 253.353,418.541 253.353,0 223.353,0 223.353,419.033 128.713,324.393 107.5,345.607 
	238.107,476.213 368.713,345.606 "
        />
      </svg>
    </div>
  </div>
</template>

<script>
import TweenMax from "gsap";

export default {
  props: ["images"],
  data() {
    return {
      currentSlide: 0,
      prevSlide: 0,
      animating: false,
      slidesCount: this.$slots.default.length - 1,
      mouseDownPos: {}
    };
  },
  mounted() {
    this.$slots.default.forEach((item, index) => {
      item.elm.classList.add("slide");
      item.elm.childNodes.forEach(item => {
        item.style.position = "relative";
      });
    });
    this.$slots.default[0].elm.style.zIndex = 5;
    this.$slots.default[0].elm.style.opacity = 1;
  },
  methods: {
    changeSlideUp() {
        if (this.currentSlide == this.slidesCount) this.currentSlide = 0;
        else this.currentSlide+=1;
    },
    changeSlideDown() {
        if (this.currentSlide == 0) this.currentSlide = this.slidesCount;
        else this.currentSlide-=1;
    }
  },
  watch: {
    currentSlide(newValue) {
      let duration = .5;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, duration * 500 * 2);
      TweenMax.to(this.$slots.default[this.prevSlide].elm, duration, {
        opacity: 0,
        zIndex: 1
      });
      TweenMax.to(this.$slots.default[newValue].elm, duration, {
        opacity: 1,
        delay: duration,
        zIndex: 5
      });
      this.prevSlide = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.home_page_slider {
  height: 100%;
  width: 100%;
  position: relative;
  background: no-repeat center center fixed;
  background-size: cover;
}

.current_slide {
  height: 100%;
  position: relative;
}

.slide {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.navigation_circles {
  position: absolute;
  right: 40px;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  .circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin: 15px 0;
    border: 1px solid black;
    transition: 0.3s;
    cursor: pointer;
  }
  .active_circle {
    background-color: black;
  }
}

.navigation_arrows {
  display: flex;
  align-items: center;
  position: absolute;
  left: 30px;
  bottom: 30px;
  z-index: 10;
  svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
    opacity: 0.5;
    transition: 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  #left {
    transform: rotate(90deg);
  }
  #right {
    transform: rotate(-90deg);
  }
  .separator {
    height: 20px;
    width: 3px;
    background-color: rgba(0, 0, 0, 0.336);
    margin: 0 10px;
  }
}

@media (max-width: 600px) {
  .navigation_circles {
    display: none;
  }
  .navigation_arrows {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>