<template>
  <div class="map_wrapper" ref="map_wrapper">
    <GmapMap
      ref="gmap"
      class="map"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markersList"
        :position="m.position"
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
  props: ["displayedItemId", "displayedItemType"],
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
      this.infoWindowPos = marker.position;
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
              <p class="title is-4">${marker.title}</p>
            </div>
          </div>
          <div class="content">
            ${marker.description}
          </div>
        </div>
      </div>`;
    },
    displayMapPlaces() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.gmap.$mapObject.panTo({ lat: 0, lng: 0 });
          let checkpoints = this.getSubCheckpoints(
            this.displayedItemId,
            this.displayedItemType
          );
          let places = checkpoints.map(item => this.getPlace(item.place_id));
          if (places.length == 1) {
            // display 1 marker on the map for checkpoint
            this.markersList = places;
            this.zoom = 0;
            if (this.renderer != null) {
              this.renderer.setMap(null);
            }
            this.$nextTick(() => {
              this.$refs.gmap.$mapObject.panTo(places[0].position);
              this.zoom = 15;
            });
          } else if (places.length > 1) {
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
                  places[0].position.lat,
                  places[0].position.lng
                ),
                waypoints: this.generateWaypoints(places),
                destination: new google.maps.LatLng(
                  places.slice(-1)[0].position.lat,
                  places.slice(-1)[0].position.lng
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
            place.position.lat,
            place.position.lng
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
    displayedItemId() {
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
</style>