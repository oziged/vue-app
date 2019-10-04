<template>
  <modal-window :value="value" @input="input">
    <div class="checkpoint_modal">
      <vue-scroll class="left_block_wrapper" :ops="scrollOptions">
        <div class="left_block">
          <div class="current_checkpoint_title">{{ currentCheckpoint.title }}</div>
          <div class="current_checkpoint_description">{{ currentCheckpoint.description }}</div>
          <div class="checkpoint_list_wrapper">
            <div class="checkpoints_list">
              <v-expansion-panels accordion>
                <checkpoint
                  v-for="(chekpoint,i) in data"
                  :key="i"
                  :nestedLvl="1"
                  :checkpoint="chekpoint.item"
                  :nested="chekpoint.nested"
                />
              </v-expansion-panels>
            </div>
          </div>
        </div>
      </vue-scroll>
      <div class="right_block">
        <slider
          :displayedItemId="displayedItemId"
          :displayedItemType="displayedItemType"
          :slickOptionsMain="slickOptionsMain"
          :slickOptionsSub="slickOptionsSub"
          :images="['http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg']"
        />
      </div>
      <div class="prev_next_checkpoint_small">
        <v-btn text icon color="black">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        <img src="@/assets/CheckpointModalShow/gps_place.png" alt />
        <v-btn text icon color="black">
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </div>
    </div>
  </modal-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";
import AppMap from "./AppMap";
import ModalWindow from "./ModalWindow";
import Slider from "./Slider";
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
import { nextTick } from "q";

export default {
  components: {
    AppMap,
    Checkpoint,
    Slick,
    Slider,
    ModalWindow
  },
  props: ["value"],
  data() {
    return {
      displayedItemId: null,
      displayedItemType: "Checkpoint",
      data: [],
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
    ...mapActions(["updateMapPlaces", "setMainCheckpointModalId"]),
    input(e) {
      this.$emit("input");
    },
    setCheckpointId(id) {
      this.displayedItemType = "Checkpoint";
      this.displayedItemId = id;
    },
    input() {
      this.$emit("input");
      this.setMainCheckpointModalId(null);
    },
    setCheckpointsData(id, type) {
      let res = [];
      let self = this;
      function getNested(id) {
        let array = [];
        let subChecks = self.getSubCheckpoints(id, "Checkpoint", true);
        if (subChecks) {
          subChecks.forEach(item => {
            let obj = {
              text: item.title,
              item: item,
              id: item.id,
              nested: getNested(item.id)
            };
            array.push(obj);
          });
          return array;
        } else return [];
      }
      let subCheckpoints = this.getSubCheckpoints(id, type, true) || [];
      subCheckpoints.forEach(item => {
        let obj = {
          text: item.title,
          item: item,
          id: item.id,
          nested: getNested(item.id)
        };
        res.push(obj);
      });
      this.data = res;
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },
  mounted() {},
  watch: {
    value(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          document.querySelector(".__rail-is-vertical").style.height = "100%"; // setup left block scroll bar full height
          document.querySelector(".__rail-is-horizontal").style.display =
            "none"; // remove horizontal scroll bar
        });
      }
    },
    mainCheckpointModalId(newValue) {
      this.displayedItemId = null;
      this.$nextTick(() => {
        document.querySelectorAll(".slide").forEach(item => {
          item.parentElement.style.height = "100%";
          item.parentElement.style.width = "100%";
        });
        this.displayedItemId = this.mainCheckpointModalId;
        this.setCheckpointsData(newValue, "Checkpoint");
      });
    }
  },
  computed: {
    scrollOptions() {
      return {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: "rgb(129, 209, 121)",
          opacity: this.windowWidth > 800 ? '.2' : '0',
          size: "6px",
          specifyBorderRadius: true,
          gutterOfSide: "0px",
          keepShow: true
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: false,
          keepShow: false,
          background: "rgb(129, 209, 121)",
          opacity: this.windowWidth > 800 ? '1' : '0',
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false
        }
      };
    },
    currentCheckpoint() {
      let temp = this.getCheckpoint(this.mainCheckpointModalId);
      if (!!temp == false) {
        return {
          title: "",
          description: ""
        };
      }
      return temp;
    },
    ...mapGetters([
      "getSubCheckpoints",
      "getCheckpoint",
      "mainCheckpointModalId",
      "mainCheckpointModalDisplay",
      "windowWidth"
    ])
  }
};
</script>
  
<style lang="scss" scoped>
.checkpoint_modal {
  display: flex;
  height: 90vh;
  overflow-x: hidden;
  .left_block {
    width: 100%;
    padding: 20px 20px 60px 20px;
    position: relative;
    overflow-x: hidden;
    .checkpoint_list_wrapper {
      margin-left: 10px;
      width: calc(100% - 10px);
    }
    .current_checkpoint_title {
      margin-bottom: 20px;
      padding-left: 30px;
      background: url("https://image.flaticon.com/icons/svg/25/25615.svg");
      background-position: center left;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }
    .current_checkpoint_description {
      margin-bottom: 20px;
    }
  }

  .prev_next_checkpoint_small {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 99;
    width: calc(30% - 8px);
    height: 60px;
    background-color: white;
    bottom: 0;
    left: 0;
    img {
      width: 30px;
      height: 30px;
      animation: rotation 10s infinite;
    }
  }

  .right_block {
    width: 70%;
  }
}

@media (max-width: 800px) {
  .checkpoint_modal {
    flex-direction: column;
    .left_block_wrapper {
      // height: auto !important;
      min-height: 200px;
      max-height: 300px;
      .left_block {
        padding-bottom: 0;
      }
    }
    .right_block {
      min-height: 400px;
      flex-grow: 1;
      width: 100%;
    }
    .prev_next_checkpoint_small {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin: 15px 0;
    }
    .slider {
      padding-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.slick-list,
.slick-track {
  height: 100%;
}

/* the slides */
.slick-slide {
  margin: 0 15px;
}
/* the parent */
.slick-list {
  margin: 0 -15px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  95% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>