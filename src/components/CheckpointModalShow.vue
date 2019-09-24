<template>
  <modal-window :value="value" @input="input">
    <div class="checkpoint_modal"> 
      <div class="prev_next_checkpoint_small">
        <v-btn text icon color="black">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        <img src="@/assets/CheckpointModalShow/gps_place.png" alt />
        <v-btn text icon color="black">
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </div>

      <div class="left_block">
        <div class="current_checkpoint_title">{{ currentCheckpoint.title }}</div>
        <div class="current_checkpoint_description">{{ currentCheckpoint.description }}</div>
        <div class="checkpoint_list_wrapper">
          <div class="checkpoints_list">
            <v-expansion-panels
              accordion
            >
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
      <div class="right_block">
        <slider
          :displayedItemId="displayedItemId"
          :displayedItemType="displayedItemType"
          :slickOptionsMain="slickOptionsMain"
          :slickOptionsSub="slickOptionsSub"
          :images="['http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg']"
        />
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
    ...mapActions([
      "updateMapPlaces",
      "setMainCheckpointModalId"
    ]),
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
  mounted() {
    window.modal = () => {
      return this.data;
    }
  },
  watch: {
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
      "mainCheckpointModalDisplay"
    ])
  }
};
</script>
  
<style lang="scss" scoped>
.checkpoint_modal {
  display: flex;
  height: 90vh;
  overflow: hidden;
  .left_block {
    width: 30%;
    padding: 20px 20px 0 20px;
    margin-bottom: 60px;
    position: relative;
    overflow-y: scroll;
    box-shadow: -3px 3px 6px 0px #0000000d;
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
    border-right: 4px solid rgba(145, 145, 145, 0.2);
    z-index: 99;
    width: 30%;
    height: 60px;
    // background-color: red;
    bottom: 0;
    left: 0;
    img {
      width: 30px;
      height: 30px;
      animation: rotation 10s infinite;
    }
  }

  .left_block::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 4px rgba(145, 145, 145, 0.3);
    background-color: #f5f5f5;
  }

  .left_block::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
  }

  .left_block::-webkit-scrollbar-thumb {
    background-color: #14e71e5e;
  }
  .right_block {
    width: 70%;
    // padding: 20px;
    // display: flex;
    // overflow-y: scroll;
    // overflow-x: hidden;
    // flex-direction: column;
    // justify-content: space-between;
  }

  // .main_slider {
  //   width: 100%;
  //   height: calc(100% - 120px);
  //   border-radius: 10px;
  //   overflow: hidden;
  //   box-shadow: 0 0 4px 0px rgba((0), 0, 0, 0.1);
  // }

  // .slick_active {
  // }

  // .sub_slider {
  //   height: 100px;
  //   overflow: hidden;
  //   .sub_slide {
  //     transition: 1s;
  //     border: 5px solid rgb(221, 237, 214);
  //   }
  //   .slick-current .sub_slide {
  //     transition: 1s;
  //     border: 5px solid rgb(138, 210, 116);
  //   }
  // }

  // .slide {
  //   width: 100%;
  //   height: 100%;
  // }

  // .sub_slide_wrapper {
  //   width: 100%;
  //   height: 100px;
  //   .sub_slide {
  //     width: calc(100% - 5px);
  //     height: 100%;
  //   }
  // }
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