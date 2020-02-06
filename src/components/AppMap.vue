<template>
  <div class="map_wrapper" ref="map_wrapper">
    <GmapMap ref="gmap" class="map" :center="center" :zoom="15" map-type-id="terrain">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markersList"
        :position="m"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m,index)"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { gmapApi } from "vue2-google-maps";

export default {
  props: ["displayedItemId", "displayedItemType", 'places'],
  data() {
    return {
      renderer: null,
      service: null,
      infoContent: "",
      markersList: [],
      center: {
        lat: 12,
        lng: 12
      },
      zoom: 15,
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },

  methods: {
    toggleInfoWindow: function(marker, idx) {
      console.log('toggling window')
      this.infoWindowPos = marker;
      this.infoContent = this.getInfoWindowContent(marker);

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function(marker) {
      return `<div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${marker.title || 'title'}</p>
            </div>
          </div>
          <div class="content">
            ${marker.description || 'description'}
          </div>
        </div>
      </div>`;
    },

    displayMapPlaces() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.gmap.$mapObject.panTo({ lat: 0, lng: 0 });
          if (this.places.length == 1) {
            // display 1 marker on the map for checkpoint
            this.markersList = this.places;
            this.zoom = 0;
            if (this.renderer != null) {
              this.renderer.setMap(null);
            }
            this.$nextTick(() => {
              this.$refs.gmap.$mapObject.panTo(this.places[0]);
              this.zoom = 15;
            });
          } else if (this.places.length > 1) {
            // display route for few subcheckpoints
            this.markersList = [];
            let _self = this;
            if (this.service == null)
              this.service = new google.maps.DirectionsService();
            if (this.renderer == null)
              this.renderer = new google.maps.DirectionsRenderer();

            this.renderer.setOptions({ map: this.$refs.gmap.$mapObject });
            this.service.route(
              {
                origin: new google.maps.LatLng(
                  this.places[0].lat,
                  this.places[0].lng
                ),
                waypoints: this.generateWaypoints(this.places),
                destination: new google.maps.LatLng(
                  this.places.slice(-1)[0].lat,
                  this.places.slice(-1)[0].lng
                ),
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
        });
      }, 1000);
    },

    generateWaypoints(places) {
      return places.slice(1, -1).map(place => {
        return {
          location: new google.maps.LatLng(
            place.lat,
            place.lng
          )
        };
      });
    },

    updateMapDivSize(timeout) {
      let map = this.$refs.map_wrapper;
      let height = map.style.height;
      map.style.height = `calc(${height} - 1px)`;
      setTimeout(() => {
        map.style.height = height;
      }, timeout);
    }
  },


  watch: {
    places() {
      this.displayMapPlaces();
    }
  },


  mounted() {
    this.updateMapDivSize(500);
    this.displayMapPlaces();
  },


  computed: {
    ...mapGetters(["allPlaces", "getPlace", "getSubCheckpoints"])
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>