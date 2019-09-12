<template>
  <v-dialog :value="value" @input="input">
    <v-card>
      <div class="checkpoint_modal">
        <div class="left_block">
          {{ currentCheckpoint.title }}
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
            >2</div>
            <div
              class="slide"
              style="background: url('https://miro.medium.com/max/2660/1*_6EdJgpcWyeWne36eFH7eA@2x.jpeg') no-repeat center center;background-size: cover;"
            >3</div>
            <div
              class="slide"
              style="background: url('http://rhinobooksnashville.com/wp-content/uploads/2019/06/30459708568_7b45f32c1c_o.jpg') no-repeat center center;background-size: cover;"
            >4</div>
            <div
              class="slide"
              style="background: url('https://www.rd.com/wp-content/uploads/2017/12/00_Top-Travel-Trends-for-2018_209155915_06photo_FT.jpg') no-repeat center center;background-size: cover;"
            >5</div>
          </slick>
          <slick class="sub_slider" ref="slick" :options="slickOptions2">
            <div
              class="slide"
              style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
            >1</div>
            <div
              class="slide"
              style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
            >2</div>
            <div
              class="slide"
              style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
            >3</div>
            <div
              class="slide"
              style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
            >4</div>
            <div
              class="slide"
              style="background: url('http://1001idea.info/wp-content/uploads/2018/02/spring-travel.jpg') no-repeat center center!important;"
            >5</div>
          </slick>
          <!-- <app-map style="width: 500px; height: 500px" :checkpointId="checkpointId" /> -->
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
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: ".main_slider",
        arrows: false,
        focusOnSelect: true,
        waitForAnimate: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 1,
              asNavFor: ".main_slider",
              arrows: false,
              focusOnSelect: true,
              waitForAnimate: false
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
  }
  .right_block {
    width: 70%;
    padding: 50px;
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

  .sub_slider {
    height: 15%;
    margin-top: 2.5%;
    overflow: hidden;
    .slick-slide {
      div {
        border: 5px solid rgb(221, 237, 214);
      }
    }
    .slick-current {
      div {
        border: 5px solid rgb(138, 210, 116);
      }
    }
  }

  .slide {
    width: 100%;
    height: 100%;
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
  margin: 0 10px;
}
/* the parent */
.slick-list {
  margin: 0 -10px;
}
</style>