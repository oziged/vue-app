<template>
  <v-dialog :value="true" width="80vw">
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
          <v-text-field
            clearable
            ref="mapPlace"
            label="Map Place"
            color="green"
            outlined
            required
            @focus="openMap"
          ></v-text-field>
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
              ref="marker"
              :position="mapPlace"
              :clickable="true"
              :draggable="false"
              @click="toggleInfoWindow(m,index)"
            />
          </GmapMap>
        </div>
        <v-file-input
          v-model="files"
          @change="updateSlider"
          color="deep-purple accent-4"
          counter
          label="File input"
          multiple
          placeholder="Select your files"
          prepend-icon="no-icon"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>
            <span
              v-else-if="index === 2"
              class="overline grey--text text--darken-3 mx-2"
            >+{{ files.length - 2 }} File(s)</span>
          </template>
        </v-file-input>
        <div class="preview">
          <div class="left_block">
            <div class="checkpoint_title">{{ title || 'Title' }}</div>
            <div class="checkpoint_description">{{ description || 'Description' }}</div>
          </div>
          <div class="right_block">
            <transition name="fade">
              <slider
                v-if="displaySlider"
                ref="slider"
                :disableMap="true"
                :images="images"
                :slickOptionsMain="slickOptionsMain"
                :slickOptionsSub="slickOptionsSub"
              />
            </transition>
          </div>
        </div>
        <v-btn @click="closeMap" color="success" dark>save checkpoint</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import Slider from "./Slider";

export default {
  components: {
    Slider
  },
  data() {
    return {
      displaySlider: true,
      title: "",
      description: "",
      mapPlace: { lat: 2, lng: 22 },
      displaySaveMapButton: false,
      files: [],
      images: [
        "https://teamkruyt.nl/wp-content/uploads/2016/12/light-blue-background-1.jpg",
        "https://teamkruyt.nl/wp-content/uploads/2016/12/light-blue-background-1.jpg",
        "https://teamkruyt.nl/wp-content/uploads/2016/12/light-blue-background-1.jpg",
        "https://teamkruyt.nl/wp-content/uploads/2016/12/light-blue-background-1.jpg"
      ],
      center: {
        lat: 12,
        lng: 12
      },
      zoom: 15,
      valid: false,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ],
      slickOptionsMain: {
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        draggable: false,
        waitForAnimate: false,
        asNavFor: ".sub_slider"
      },
      slickOptionsSub: {
        initialSlide: 0,
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: ".main_slider",
        arrows: false,
        focusOnSelect: true,
        waitForAnimate: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      }
    };
  },
  methods: {
    t(event) {
      console.log(event);
    },
    openMap() {
      this.$refs.map.style.height = "500px";
      this.displaySaveMapButton = true;
    },
    closeMap() {
      this.displaySaveMapButton = false;
      this.$refs.map.style.height = "0px";
      let temp = this.$refs.mapPlace.$el.querySelector("input").value;
      this.$nextTick(() => {
        this.$refs.mapPlace.$el.querySelector("input").value = temp;
      });
    },
    updateSlider() {
      this.images = this.files.map(item => {
        return window.URL.createObjectURL(item);
      });
      this.displaySlider = false;
      setTimeout(() => {
        this.displaySlider = true;
      }, 1000);
    },
    console() {
      console.log("console");
    }
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      let input = this.$refs.mapPlace.$el.querySelector("input");
      input.placeholder = "";
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        let place = autocomplete.getPlace();
        this.mapPlace = place.geometry.location;
        this.$refs.gmap.$mapObject.panTo(place.geometry.location);
        let temp = input.value;
        this.$nextTick(() => {
          input.value = temp;
        });
      });
      google.maps.event.addListener(this.$refs.gmap.$mapObject, "click", e => {
        let temp = this.$refs.mapPlace.$el.querySelector("input").value;
        this.mapPlace = e.latLng;
        this.$nextTick(() => {
          this.$refs.mapPlace.$el.querySelector("input").value = temp;
        });
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

.preview {
  display: flex;
}

.left_block {
  width: 30%;
  .checkpoint_title {
    position: relative;
    margin-bottom: 20px;
    padding-left: 30px;
    background: url("https://image.flaticon.com/icons/svg/25/25615.svg");
    background-position: center left;
    background-size: auto 100%;
    background-repeat: no-repeat;
  }
}

.right_block {
  width: 70%;
  min-height: 400px;
  max-height: 600px;
}
</style>