<template>
  <section>
    <div class="home_content">
      <h2 class="home_title">Travel Plan</h2>
      <p
        class="home_title_desc"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, minus nesciunt! Consequuntur, autem aut eius reiciendis quia rerum tenetur earum porro deserunt eligendi tempore, sequi quidem quasi nam. Aliquam, rerum!</p>
      <GmapMap
        class="home_map"
        ref="gmap"
        :center="currentLocation"
        :zoom="5"
        map-type-id="terrain"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in allPlaces"
          :position="m.position"
          :clickable="true"
          :opacity="markersOpacity"
          :draggable="false"
        />
      </GmapMap>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { clearInterval } from "timers";
import TweenMax from "gsap";

export default {
  data() {
    return {
      markersOpacity: 0,
      markers: []
    };
  },
  computed: {
    ...mapGetters(["allPlaces", "currentLocation"])
  },
  methods: {},
  watch: {
    currentLocation() {
      this.center = this.currentLocation || { lat: 0, lng: 0 };
    }
  },
  mounted() {
    window.loc = () => {
      return this.currentLocation;
    };
    TweenMax.to(".home_title, .home_title_desc", 1, { opacity: 1, delay: 0.5 });
    TweenMax.to(".home_map", 1, { opacity: 1, y: 0, delay: 1 });
    this.$gmapApiPromiseLazy().then(() => {
      setTimeout(() => {
        let a = setInterval(() => {
          if (this.markersOpacity == 1) clearInterval(a);
          this.markersOpacity += 0.1;
        }, 100);
      }, 1000);
    });
  }
};
</script>

<style lang="scss" scoped>
.home_content {
  .home_title {
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    opacity: 0;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #000;
  }
  .home_title_desc {
    text-align: center;
    opacity: 0;
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .home_map {
    max-width: 1000px;
    height: 600px;
    opacity: 0;
    transform: translateY(-200px);
    margin: 0 auto;
    padding: 250px;
    background-color: black;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>