<template>
  <v-dialog :value="true" @input="input" width="80vw">
    <v-card>
      <div class="checkpoint_new_modal">
        <v-form v-model="valid">
          <v-text-field
            label="Title"
            v-model="title"
            :rules="titleRules"
            color="green"
            outlined
            required
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="description"
            auto-grow
            rows="4"
            row-height="25"
            color="green"
            outlined
            required
          ></v-textarea>
          <v-text-field clearable ref="mapPlace" label="Map Place" color="green" outlined required></v-text-field>
        </v-form>
        <div class="map" ref="map">
          <transition name="fade">
            <v-btn
              v-if="displaySaveMapButton"
              @click="closeMap"
              class="save_map_place"
              color="success"
              dark
            >SAVE</v-btn>
          </transition>
          <GmapMap
            ref="gmap"
            :center="center"
            :zoom="zoom"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
          >
            <GmapMarker
              :position="mapPlace"
              :clickable="true"
              :draggable="true"
              @click="toggleInfoWindow(m,index)"
            />
          </GmapMap>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      title: "",
      description: "",
      mapPlace: "",
      displaySaveMapButton: false,
      center: {
        lat: 12,
        lng: 12
      },
      zoom: 15,
      valid: false,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ]
    };
  },
  methods: {
    closeMap() {
      this.displaySaveMapButton = false;
      this.$refs.map.style.height = "0px";
      this.$nextTick(() => {
        // this.$refs.mapPlace.$el.querySelector("input").value = "";
      });
    }
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      let input = this.$refs.mapPlace.$el.querySelector("input");
      window.input = input;
      input.addEventListener("focus", () => {
        this.$refs.map.style.height = "500px";
        this.displaySaveMapButton = true;
      });
      input.placeholder = "";
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        let place = autocomplete.getPlace();
        this.mapPlace = place.geometry.location;
        this.$refs.gmap.$mapObject.panTo(place.geometry.location);
        console.log(input.value);
        console.log(this.$refs.mapPlace.$el.value);
        this.$nextTick(()=>{
          input.value = place.formatted_address;
        })

        google.maps.event.addListener(
          this.$refs.gmap.$mapObject,
          "click",
          e => {
            this.mapPlace = e.latLng;
          }
        );
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.checkpoint_new_modal {
  padding: 20px;
}

.map {
  height: 0px;
  transition: 1s;
  position: relative;
}

.save_map_place {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  height: 0;
}
</style>