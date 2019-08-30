<template>
  <v-col lg="9" class="testt">
    <button @click="test(true)">create routes</button>
    <button @click="test(false)">remove routes</button>
    <GmapMap
      ref="gmap"
      :center="{lat:10, lng:20}"
      :zoom="8"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in allPlaces"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m.position,index)"

      />
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </GmapInfoWindow>
    </GmapMap>
  </v-col>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      renderer: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    
    test(m) {
      let _self = this;
      console.log(google);
      if (m == false) {
        this.renderer.setMap(null);
      } else {
        var directionsService = new google.maps.DirectionsService();
        if (this.renderer == null) {
          this.renderer = new google.maps.DirectionsRenderer();
        }
        this.renderer.setMap(this.$refs.gmap.$mapObject);
        directionsService.route(
          {
            origin: "chicago, il",
            waypoints: [
              {
                location: "st louis, mo"
              },
              {
                location: "amarillo, tx"
              }
            ],
            destination: "kingman, az",
            travelMode: "DRIVING"
          },
          function(response, status) {
            if (status === "OK") {
              _self.renderer.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
    },
    toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker;
        this.infoContent = this.getInfoWindowContent(marker);
        

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
      getInfoWindowContent: function (marker) {
        return (`<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">${marker}</p>
      </div>
    </div>
    <div class="content">
      ${marker}
      <br>
      <time datetime="2016-1-1">${marker}</time>
    </div>
  </div>
</div>`);
      },
  },
  computed: {
    ...mapGetters(["allPlaces"]),
    markersPositions() {
      return this.items.map(item => ({
        lat: item.lat,
        lng: item.lng
      }));
    }
  }
};
</script>

<style>
.testt {
  height: 100vh;
}
</style>