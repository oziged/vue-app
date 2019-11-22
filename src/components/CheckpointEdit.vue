<template>
  <modal-window :value="value" @input="input">
    <div class="checkpoint_edit_modal">
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
          class="gmap"
          :center="center"
          :zoom="zoom"
          map-type-id="terrain"
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
          <vue-scroll  v-if="windowWidth > 800"
            class="checkpoint_description" style="max-height: 600px; ">
          <div
           
          >{{ description || 'Description' }}</div>
          </vue-scroll>
          <vue-scroll v-else class="checkpoint_description_wrapper" style="height: 200px; ">
            <div class="checkpoint_description">{{ description || 'Description' }}</div>
          </vue-scroll>
        </div>
        <div class="right_block">
          <transition name="fade">
            <slider
              v-if="displaySlider && images.length"
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
      mapPlace: {lat: 0, lng: 0},
      mapPlaceInput: "",
      displaySaveMapButton: false,
      files: [],
      filesValidations: {
        size: 5,
        types: ["image/png", "image/jpg", "image/jpeg"]
      },
      images: ['https://cdn.pixabay.com/photo/2016/01/13/01/36/bagan-1137015__340.jpg'],
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
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions([
      "toggleEditCheckpointModal",
      "updateCheckpoint",
      "setEditPlanModalId"
    ]),
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
        this.toggleEditCheckpointModal();
        this.$forceUpdate();
        this.updateCheckpoint({
          title: this.title,
          description: this.description,
          position: {
            lat: typeof this.mapPlace.lat == 'function' ? this.mapPlace.lat() : this.mapPlace.lat,
            lng: typeof this.mapPlace.lng == 'function' ? this.mapPlace.lng() : this.mapPlace.lng,
          }
        });
        let temp = this.editPlanModalId;
        this.setEditPlanModalId(0);
        this.setEditPlanModalId(temp);
      }
    },
    input(e) {
      if (e.target.className.includes("pac-item")) return; // fix for mobile devices on touch event on pac div
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
    ...mapGetters([
      "currentLocation",
      "getCheckpoint",
      "editCheckpointModalId",
      "windowWidth",
      "getPlace",
      "editPlanModalId"
    ])
  },
  watch: {
    editCheckpointModalId(newValue) {
      let checkpoint = this.getCheckpoint(newValue);
      let place = this.getPlace(checkpoint.place_id);

      this.title = checkpoint.title;
      this.description = checkpoint.description;
      this.mapPlaceInput = `Map position: (${place.position.lat}, ${place.position.lng})`;
      this.mapPlace = {lat: place.position.lat, lng: place.position.lng};
      this.center = {lat: place.position.lat, lng: place.position.lng}
    },
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
.checkpoint_edit_modal {
  padding: 50px;
}

.map {
  height: 0px;
  transition: 1s;
  margin-bottom: 0px;
  position: relative;
}

.gmap {
  width: 100%;
  height: 100%;
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
  padding-left: 30px;
  position: relative;
  .slider {
    height: 400px;
    &:hover::before {
      opacity: 1;
    }
    &::before {
      opacity: 0;
      content: 'Here u can se uploaded images (currently, they just displaying and when checkpoint is created - images drop';
      position: absolute;
      z-index: 5;
      left: calc(50% + 15px);
      transform: translateX(-50%);
      top: 40px;
      width: 80%;
      font-size: 14px;
      background-color: rgba(255, 255, 255, 0.267);
      background-color: rgba(29, 21, 21, 0.51);
      color: aliceblue;
      font-family: monospace;
      transition: .5s;
    }
  }
}

.save_checkpoint {
  display: block;
  margin: 40px auto 0 auto;
}

@media (max-width: 800px) {
  .checkpoint_edit_modal {
    padding: 20px;
    .preview {
      flex-direction: column;
      .left_block {
        width: 100%;
        margin-bottom: 15px;
      }
      .right_block {
        width: 100%;
        padding: 0;
      }
      .slider {
        padding: 0;
        &::before {
          left: 50%;
        }
      }
    }
    .checkpoint_description_wrapper {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 4px 0px;
      .checkpoint_description {
        padding: 10px;
      }
    }
    .save_checkpoint {
      margin-top: 16px;
    }
  }
}
</style>