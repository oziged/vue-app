<template>
  <modal-window :value="value" @input="input">
    <div class="checkpoint_new_modal">
      <v-form ref="form">
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
          :rules="descriptionRules"
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
          v-model="mapPlaceInput"
          :rules="mapPlaceRules"
          color="green"
          outlined
          required
          v-click-outside="closeMap"
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
          :center="currentLocation || {lat: 0, lng: 0}"
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
        color="green"
        counter
        label="File input"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        placeholder="Select your files"
        prepend-icon="no-icon"
        outlined
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip v-if="index < 2" color="green" dark label small>{{ text }}</v-chip>
          <span v-else-if="index === 2" class="overline green">+{{ files.length - 2 }} File(s)</span>
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
      <v-btn class="save_checkpoint" @click="submit" color="success" dark>save checkpoint</v-btn>
    </div>
  </modal-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { gmapApi } from "vue2-google-maps";
import Slider from "./Slider";
import ModalWindow from "./ModalWindow";

export default {
  components: {
    Slider,
    ModalWindow
  },
  props: ["value"],
  data() {
    return {
      displaySlider: true,
      title: "",
      description: "",
      mapPlace: { lat: 2, lng: 22 },
      mapPlaceInput: "",
      displaySaveMapButton: false,
      files: [],
      filesValidations: {
        size: 5,
        types: ["image/png", "image/jpg", "image/jpeg"]
      },
      images: [
        "https://cdn.dribbble.com/users/479289/screenshots/4521207/plexus_bg_2.gif",
        "https://cdn.dribbble.com/users/479289/screenshots/4521207/plexus_bg_2.gif",
        "https://cdn.dribbble.com/users/479289/screenshots/4521207/plexus_bg_2.gif",
        "https://cdn.dribbble.com/users/479289/screenshots/4521207/plexus_bg_2.gif"
      ],
      center: {
        lat: 12,
        lng: 12
      },
      zoom: 15,
      valid: false,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 20 || "Name must be less than 30 characters"
      ],
      descriptionRules: [
        v => !!v || "Description is required",
        v => v.length <= 5000 || "Description must be less than 5000 characters"
      ],
      mapPlaceRules: [v => !!v || "Place on map is required"],
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
    ...mapActions(["toggleNewCheckpointModal"]),
    openMap() {
      this.$refs.map.style.height = "500px";
      this.$refs.map.style.marginBottom = "20px";
      this.displaySaveMapButton = true;
    },
    closeMap(e) {
      if (
        (e.target.closest(".map") && !e.target.closest(".save_map_place")) ||
        e.target.className == "gm-ui-hover-effect"
      )
        return;
      this.displaySaveMapButton = false;
      this.$refs.map.style.height = "0px";
      this.$refs.map.style.marginBottom = "0px";
    },
    updateSlider() {
      this.validateFiles();
      this.$nextTick(() => {
        this.images = this.files.map(item => {
          return window.URL.createObjectURL(item);
        });
        if (this.files.length) {
          this.displaySlider = false;
          setTimeout(() => {
            this.displaySlider = true;
          }, 1000);
        }
      });
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log('checkpoint created');
        this.toggleNewCheckpointModal();
        this.$forceUpdate();
      }
    },
    input() {
      this.$emit("input");
    },
    validateFiles() {
      for (let i = 0; i < this.files.length; i++) {
        if (
          !this.filesValidations.types.includes(this.files[i].type) ||
          this.files[i].size > this.filesValidations.size * 1000000
        ) {
          this.files.splice(i, 1);
          i--;
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error",
            text: "One of your files didn't upload"
          });
        }
      }
    }
  },
  computed: {
    ...mapGetters(["currentLocation"])
  },
  watch: {
    value() {
      if (this.value == true) {
        this.$nextTick(() => {
          this.$gmapApiPromiseLazy().then(() => {
            let input = this.$refs.mapPlace.$el.querySelector("input");
            let autocomplete = new google.maps.places.Autocomplete(input);
            setTimeout(() => {
              input.placeholder = "";
            }, 0);
            autocomplete.addListener("place_changed", () => {
              let place = autocomplete.getPlace();
              this.mapPlace = place.geometry.location;
              this.$refs.gmap.$mapObject.panTo(place.geometry.location);
              let temp = input.value;
              this.mapPlaceInput = temp;
            });
            google.maps.event.addListener(
              this.$refs.gmap.$mapObject,
              "click",
              e => {
                this.mapPlace = e.latLng;
                this.mapPlaceInput = this.mapPlace;
              }
            );
          });
        });
      } else {
        this.displaySaveMapButton = false;
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.checkpoint_new_modal {
  padding: 50px;
}

.map {
  height: 0px;
  transition: 1s;
  margin-bottom: 0px;
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
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  .slider {
    padding: 0 0 0 20px;
  }
}

.save_checkpoint {
  display: block;
  margin: 40px auto 0 auto;
}
</style>