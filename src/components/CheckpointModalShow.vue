<template>
  <v-dialog :value="value" @input="input" width="80vw">
    <v-card>
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
                v-if="getSubCheckpoints(currentCheckpoint.id, 'Checkpoint')['id']!=currentCheckpoint.id"
                accordion
              >
                <checkpoint
                  v-for="(item,i) in getSubCheckpoints(currentCheckpoint.id, 'Checkpoint')"
                  :key="i"
                  :nestedLvl="1"
                  :checkpoint="item"
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
            :images="['http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg' ]"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";
import AppMap from "./AppMap";
import Slider from "./Slider";
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";

export default {
  components: {
    AppMap,
    Checkpoint,
    Slick,
    Slider
  },
  props: ["value"],
  data() {
    return {
      displayedItemId: null,
      displayedItemType: "Checkpoint",
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
    ...mapActions(["updateMapPlaces", "setCurrentCheckpoint"]),
    input(e) {
      this.$emit("input");
    },
    setCheckpointId(id) {
      this.displayedItemType = "Checkpoint";
      this.displayedItemId = id;
    },
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },
  mounted() {},
  watch: {
    getPlanModalCheckpointId() {
      this.displayedItemId = null;
      this.$nextTick(() => {
        document.querySelectorAll(".slide").forEach(item => {
          item.parentElement.style.height = "100%";
          item.parentElement.style.width = "100%";
        });
        this.displayedItemId = this.getPlanModalCheckpointId;
      });
    }
  },
  computed: {
    currentCheckpoint() {
      return this.getCheckpoint(this.getPlanModalCheckpointId);
    },
    ...mapGetters([
      "getSubCheckpoints",
      "getCheckpoint",
      "getPlanModalCheckpointId",
      "planCheckpointModalDisplay"
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