<template>
  <v-dialog :value="value" @input="input">
    <v-card>
      <div class="checkpoint_modal">
        <div class="left_block">
          {{ currentCheckpoint.title }}
          {{ currentCheckpoint.description }}
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
        <div class="divider"></div>
        <div class="right_block">
          <slick class="main_slider" ref="slick" :options="slickOptions">
            <div class="slide">
              <app-map style="width: 100%; height: 100%" :checkpointId="checkpointId" />
            </div>
            <div
              class="slide"
              style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center;"
            ></div>
            <div
              class="slide"
              style="background: url('https://miro.medium.com/max/2660/1*_6EdJgpcWyeWne36eFH7eA@2x.jpeg') no-repeat center center;background-size: cover;"
            ></div>
            <div
              class="slide"
              style="background: url('http://rhinobooksnashville.com/wp-content/uploads/2019/06/30459708568_7b45f32c1c_o.jpg') no-repeat center center;background-size: cover;"
            ></div>
            <div
              class="slide"
              style="background: url('https://www.rd.com/wp-content/uploads/2017/12/00_Top-Travel-Trends-for-2018_209155915_06photo_FT.jpg') no-repeat center center;background-size: cover;"
            ></div>
          </slick>
          <slick class="sub_slider" ref="slick" :options="slickOptions2">
            <div class="sub_slide_wrapper">
              <div
                class="sub_slide"
                style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
              >1</div>
            </div>
            <div class="sub_slide_wrapper">
              <div
                class="sub_slide"
                style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
              >2</div>
            </div>
            <div class="sub_slide_wrapper">
              <div
                class="sub_slide"
                style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
              >3</div>
            </div>
            <div class="sub_slide_wrapper">
              <div
                class="sub_slide"
                style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
              >4</div>
            </div>
            <div class="sub_slide_wrapper">
              <div
                class="sub_slide"
                style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
              >5</div>
            </div>
          </slick>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Checkpoint from "./Checkpoint";
import AppMap from "./AppMap";
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";

export default {
  components: {
    AppMap,
    Checkpoint,
    Slick
  },
  props: ["value"],
  data() {
    return {
      checkpointId: null,
      slickOptions: {
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        draggable: false,
        waitForAnimate: false,
        asNavFor: ".sub_slider"
      },
      slickOptions2: {
        slidesToShow: 6,
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
      this.checkpointId = id;
    },
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    }
  },
  provide() {
    return {
      setCheckpointId: this.setCheckpointId
    };
  },
  mounted() {},
  watch: {
    getPlanModalCheckpointId() {
      this.checkpointId = null;
      this.$nextTick(() => {
        document.querySelectorAll(".slide").forEach(item => {
          item.parentElement.style.height = "100%";
          item.parentElement.style.width = "100%";
        });
        this.checkpointId = this.getPlanModalCheckpointId;
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
  
<style lang="scss">
.checkpoint_modal {
  display: flex;
  height: 90vh;
  overflow: hidden;
  .left_block {
    width: 30%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .left_block::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.left_block::-webkit-scrollbar
{
	width: 6px;
	background-color: #F5F5F5;
}

.left_block::-webkit-scrollbar-thumb
{
	background-color: #000000;
}
  .right_block {
    width: 70%;
    padding: 50px;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    justify-content: space-between;
  }
  .test {
    height: 100%;
  }

  .divider {
    width: 1px;
    height: 100%;
    background-color: black;
    margin: 0 15px;
  }

  .main_slider {
    width: 100%;
    height: 80%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 4px 0px rgba((0), 0, 0, 0.1);
  }

  .slick_active {
  }

  .sub_slider {
    height: 100px;
    overflow: hidden;
    .sub_slide {
      transition: 1s;
      border: 5px solid rgb(221, 237, 214);
    }
    .slick-current .sub_slide {
      transition: 1s;
      border: 5px solid rgb(138, 210, 116);
    }
  }

  .slide {
    width: 100%;
    height: 100%;
  }

  .sub_slide_wrapper {
    width: 100%;
    height: 100px;
    .sub_slide {
      width: calc(100% - 5px);
      height: 100%;
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
</style>