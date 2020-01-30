<template>
  <div>
    <section class="home_page_slider">
      <home-page-slider>
        <div class="home_page_slide slide1">
          <img
            class="home_page_slide_bg"
            src="https://i.pinimg.com/originals/ae/37/e4/ae37e49bc7e9376089eb8f80f22b28f2.jpg"
            alt
          />
          <div class="content">
            <h2>we are travel.</h2>
            <div class="separator"></div>
            <h4>
              travels
              <br />it's a lifestyle
            </h4>
            <!-- <button>get in touch</button> -->
          </div>
        </div>
        <div class="home_page_slide slide1">
          <img
            class="home_page_slide_bg"
            src="https://independenttravelcats.com/wp-content/uploads/2018/03/Destinations.jpg"
            alt
          />
          <div class="content">
            <h2>you are travel.</h2>
            <div class="separator"></div>
            <h4>
              create
              <br />what you want
            </h4>
            <!-- <button>get in touch</button> -->
          </div>
        </div>
        <div class="home_page_slide slide1">
          <img
            class="home_page_slide_bg"
            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2Fsolo-travel-women-lake-packsolo0717.jpg%3Fitok%3D4o68ByzL&q=85"
            alt
          />
          <div class="content">
            <h2>all is travel.</h2>
            <div class="separator"></div>
            <h4>
              find
              <br />what you need
            </h4>
            <!-- <button>get in touch</button> -->
          </div>
        </div>
      </home-page-slider>
    </section>
    <section class="abilities_section">
      <h2 class="home_page_title">what we do?</h2>
      <div class="abilities_list">
        <div class="ability">
          <div class="img_block_wrapper">
            <div class="img_block"></div>
          </div>
          <div class="desc_block">
            <div class="desc_block_title">
              <h5>travel</h5>
              <h5>planning</h5>
            </div>
            <div class="separator"></div>
            <p>
             Our main goal is to make your travel comfortable, convenient, and most importantly - planned. During your travels, we will be your only guide with all the necessary information.
              <br />
              <br />All the necessary information is collected in one place, in the most detailed and convenient view. Google maps, google places, related images-all this you can find literally in one click, in an instant.
            </p>
          </div>
        </div>
        <div class="ability">
          <div class="img_block_wrapper">
            <div class="img_block"></div>
          </div>
          <div class="desc_block">
            <div class="desc_block_title">
              <h5>create</h5>
              <h5>your own</h5>
            </div>
            <div class="separator"></div>
            <p>
              Here you can create your own travel plans. no need to pay for anything, everything is absolutely free. just create, add a couple of checkpoints and that's it. You already have a ready travel plan.
              <br />
              <br />In the plan, you can add an endless number of checkpoints with deep nesting, so with respect to each point in the route, you can build an in-depth route and plan your trip in as much detail as possible.
            </p>
          </div>
        </div>
        <div class="ability">
          <div class="img_block_wrapper">
            <div class="img_block"></div>
          </div>
          <div class="desc_block">
            <div class="desc_block_title">
              <h5>travel</h5>
              <h5>companies</h5>
            </div>
            <div class="separator"></div>
            <p>
              If you are a travel company and want to promote your own travel plans, you can also use our app. The procedure is the same. Just create a plan, set up all the necessary points, add information and you're done.
              <br />
              <br />As a result, you can promote your plans, develop them, find a new audience, new customers and all this on absolutely free terms.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="countries_section">
      <h2 class="home_page_title">trending countries</h2>
      <magic-grid class="countries_list" :gap="10" :maxColWidth="9999">
        <div class="country" @click="enableCountryModal">
          <img src="https://nezavisen.mk/wp-content/uploads/2019/08/p0674nnc.jpg" alt />
          <div class="country_desc">
            <h3>Israel</h3>
            <country-flag country="il" size="big" />
            <span>Few places on earth stir up passion the way that Israel does: the breathtaking beauty of its hills and valleys, the eerie stillness of the Dead Sea, the multi-coloured canyon of Makhtesh Ramon, and the ancient walls and pathways of Nazareth and Jerusalem.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country" @click="enableCountryModal">
          <img src="https://www.planetware.com/photos-large/USNY/usa-best-places-new-york.jpg" alt />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country" @click="enableCountryModal">
          <img
            src="https://handluggageonly.co.uk/wp-content/uploads/2018/02/Hand-Luggage-Only-8-5.jpg"
            alt
          />
          <div class="country_desc">
            <h3>Italy</h3>
            <country-flag country="it" size="big" />
            <span>Italy charms visitors with irresistible food, awesome architecture, diverse scenery and unparalleled art.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country" @click="enableCountryModal">
          <img
            src="https://www.ktchnrebel.com/wp-content/uploads/2019/03/Working-in-Mexico-City-KTCHNrebel-copyright-Fotolia-javarman.jpg"
            alt
          />
          <div class="country_desc">
            <h3>Mexico</h3>
            <country-flag country="mx" size="big" />
            <span>Palm-fringed beaches, chili-spiced cuisine, steamy jungles, teeming cities, fiesta fireworks, Frida’s angst: Mexico conjures up diverse, vivid dreams. And the reality lives up to them.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country" @click="enableCountryModal">
          <img
            src="https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/thailand-1200x819.jpg"
            alt
          />
          <div class="country_desc">
            <h3>Thailand</h3>
            <country-flag country="th" size="big" />
            <span>Friendly and food-obsessed, hedonistic and historic, cultured and curious, Thailand tempts visitors with a smile as golden as the country's glittering temples and tropical beaches.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country" @click="enableCountryModal">
          <img
            src="https://afar-production.imgix.net/uploads/syndication/holland_americas/images/h9B977Yqvt/original_ESY-013403436.Berlin.Hero.AGE.crop.jpg?w=750&h=563&fit=crop"
            alt
          />
          <div class="country_desc">
            <h3>Germany</h3>
            <country-flag country="de" size="big" />
            <span>Prepare for a roller-coaster ride of feasts, treats and temptations experiencing Germany's soul-stirring scenery, spirit-lifting culture, big-city beauties, romantic palaces and half-timbered towns.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
      </magic-grid>
    </section>
    <section class="feedback_section">
      <div class="feedback_form">
        <div class="feedback_form_title">get in touch</div>
        <div class="feedback_content_wrapper">
          <div class="top_block">
            <feed-back-form />
          </div>
          <div class="bottom_block">
            <div class="address">
              <div class="img_block">
                <img src="@/assets/HomePage/Pin.png" alt />
              </div>23 Mulholland Drive, Suite 721. Los Angeles 10010
              <br />100 S. Main Street. Los Angeles 90012
            </div>
            <div class="number">
              <div class="img_block">
                <img src="@/assets/HomePage/iPhone.png" alt />
              </div>+1-670-567-5590
            </div>
            <div class="email">
              <div class="img_block">
                <img src="@/assets/HomePage/Envelope.png" alt />
              </div>hello@clemocreative.com
            </div>
            <div class="social_networks">
              <a href="#" class="circle">
                <img src="@/assets/HomePage/facebook.png" alt />
              </a>
              <a href="#" class="circle">
                <img src="@/assets/HomePage/google_plus.png" alt />
              </a>
              <a href="#" class="circle">
                <img src="@/assets/HomePage/Instagram.png" alt />
              </a>
              <a href="#" class="circle">
                <img src="@/assets/HomePage/pinterest.png" alt />
              </a>
              <a href="#" class="circle">
                <img src="@/assets/HomePage/twitter.png" alt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="year">2019 travel.</div>
      <div class="rights">all right reserved</div>
    </footer>
    <div class="cursor">
      <div class="instant_move">
        <div class="default_circle"></div>
        <div class="arrow">
          <img src="@/assets/HomePage/arrow.png" alt />
        </div>
        <div class="cursor_country"></div>
      </div>
      <div class="bg_circle"></div>
    </div>
    <modal-window
      class="country_full_screen"
      :value="countryFullScreen.value"
      overflowY="hidden"
      overflowX="hidden"
    >
      <img :src="countryFullScreen.src" alt @click="disableCountryModal" />
      <div class="country_modal_desc">
        <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
      </div>
    </modal-window>
  </div>
</template>

<script>
import axios from 'axios';

import HomePageSlider from "../components/HomePage/HomePageSlider";
import FeedBackForm from "../components/HomePage/FeedBackForm";
import CursorLogic from "../cursorHelper";
import ModalWindow from "../components/ModalWindow";
import conditionHandler from '../mixins/conditionHandler'
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [conditionHandler],
  components: {
    HomePageSlider,
    FeedBackForm,
    ModalWindow
  },
  data() {
    return {
      cursorLogic: null,
      ImagesHelper: null,
      countryFullScreen: {
        value: false,
        src: ""
      }
    };
  },
  methods: {
    enableCountryModal(e) {
      let div = e.target.closest(".country");
      let src = div.querySelector("img").src;
      this.countryFullScreen.value = true;
      this.countryFullScreen.src = src;
      document
        .querySelector(".countries_list")
        .dispatchEvent(new Event("mouseleave"));
    },
    disableCountryModal(e) {
      this.countryFullScreen.value = false;
    }
  },
  computed: {
    ...mapGetters(["performanceLvl", "isMobile"])
  },
  created() {},
  async mounted() {
    await this.conditionHandler('Performance check', () => this.performanceLvl)
    if (this.performanceLvl > 70 && !this.isMobile) {
      this.cursorLogic = new CursorLogic();
      this.cursorLogic.disableDefaultCursor();
      this.cursorLogic.enableListeners();
    }
  },

  beforeDestroy() {
    this.cursorLogic.enableDefaultCursor();
  }
};
</script>

<style lang="scss" scoped>
section,
footer {
  font-family: Montserrat;
}

.home_page_slider {
  margin: 0 auto;
  max-width: 1250px;
  height: 520px;
  width: 100%;
}

.home_page_title {
  color: #000000;
  font-family: "Montserrat";
  font-size: 50px;
  font-weight: 400;
  line-height: 48px;
  text-align: center;
  margin: 80px auto;
  width: fit-content;
}

.home_page_slide {
  .content {
    z-index: 5;
  }
}

.home_page_slide_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  left: 0;
  top: 0;
  z-index: -1;
}

.home_page_slide::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-color: #bddbffcc;
}

.abilities_list {
  max-width: 1250px;
  margin: 0 auto;
  .ability {
    display: flex;
    margin-bottom: 100px;
    &:nth-child(even) {
      .img_block_wrapper {
        margin-right: 0;
        margin-left: 20px;
      }
      .desc_block {
        margin-left: 0;
        width: calc(50% - 50px);
        margin-right: 50px;
        order: -1;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    .img_block_wrapper {
      width: calc(50% - 20px);
      margin-right: 20px;
      height: 500px;
      background-color: rgba(0, 0, 0, 0.05);
    }
    .img_block {
      width: 100%;
      height: 100%;
      background: url("https://www.sassyhongkong.com/wp-content/uploads/2018/07/travel-lessons-learned-minimalist-1.jpg")
        no-repeat center center/cover;
      transition: 0.5s ease-out;
      &:hover {
        transform: scale(0.97);
      }
    }
    .desc_block {
      width: calc(50% - 50px);
      font-family: Montserrat;
      font-size: 30px;
      font-weight: 300;
      margin-left: 50px;
      line-height: 0;
      &:hover {
        .separator {
          width: 90px;
        }
        p {
          background-position: -100% 0;
        }
      }
      h5 {
        line-height: 40px;
      }
      h5:first-child {
        font-size: 30px;
        font-weight: normal;
      }
      h5:last-child {
        font-size: 48px;
        letter-spacing: -1px;
      }
      .separator {
        height: 3px;
        width: 70px;
        margin: 20px 0;
        background-color: rgba(0, 0, 0, 0.281);
        transition: 0.3s ease-out;
      }
      p {
        color: #656565;
        font-family: Montserrat;
        font-size: 18px;
        font-weight: 300;
        line-height: 27px;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 50%,
          rgba(236, 236, 236, 0.466) 50%
        );
        background-size: 200%;
        background-position: 0 0;
        display: inline;
        transition: 0.5s ease-in-out;
      }
    }
  }
}

.countries_list {
  max-width: 1250px;
  margin: 0 auto;
  margin-bottom: 100px;
  .country {
    width: calc((100% - 31px) / 3);
    overflow: hidden;
    // cursor: pointer;
    &:nth-child(odd) {
      height: 364px;
    }
    &:nth-child(even) {
      height: 590px;
    }
    &:nth-child(3n + 1) {
      left: 0 !important;
    }
    &:nth-child(3n) {
      left: auto !important;
      right: 0 !important;
    }
    &:hover {
      .country_desc {
        opacity: 1;
        h3 {
          left: 0;
        }
        span {
          bottom: 0;
        }
      }
      .hover_bg {
        opacity: 1;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .country_desc {
      position: absolute;
      bottom: 10px;
      left: 20px;
      padding: 10px;
      margin-right: 20px;
      background-color: #0000007a;
      z-index: 10;
      color: white;
      position: absolute;
      font-family: Montserrat;
      opacity: 0;
      transition: 0.3s;
      .flag {
        display: block;
      }
      h3 {
        position: relative;
        left: -110px;
        font-size: 40px;
        transition: 0.3s ease-in-out;
        line-height: 40px;
      }
      span {
        position: relative;
        bottom: -100px;
        font-weight: 500;
        transition: 0.3s ease-in-out;
      }
    }
    .hover_bg {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: 0.5s;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}

.feedback_section {
  background-color: black;
  width: 100%;
  height: 100%;
}

.feedback_form {
  max-width: 1250px;
  margin: 0 auto;
  color: white;
  padding: 90px 0;
  .feedback_form_title {
    padding-bottom: 75px;
    text-align: center;
    font-family: "Montserrat";
    font-size: 60px;
    line-height: 48px;
  }
  .feedback_content_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bottom_block {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .address,
    .number,
    .email {
      display: flex;
      margin-bottom: 35px;
      .img_block {
        margin-right: 20px;
        img {
          // height: 100%;
          // width: 100%;
        }
      }
    }
    .address {
      .img_block {
        height: 16px;
        margin-top: 2px;
      }
    }
    .number {
      .img_block {
        height: 14px;
        margin-top: 1px;
      }
    }
    .email {
      .img_block {
        height: 10px;
      }
    }
    .social_networks {
      display: flex;
      .circle {
        display: block;
        position: relative;
        margin: 0 5px;
        border-radius: 50%;
        background-color: white;
        width: 40px;
        height: 40px;
        &:first-child {
          margin-left: 0;
        }
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .top_block {
    width: 50%;
    max-width: 600px;
    margin-bottom: 30px;
  }
}

footer {
  height: 130px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .year {
    font-weight: bold;
  }
}

.slide1 {
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      text-align: center;
      color: #000000;
      font-size: 48px;
      font-weight: 700;
      line-height: 50px;
      letter-spacing: -1px;
    }
    .separator {
      height: 5px;
      width: 50px;
      background-color: black;
      margin: 20px 0;
    }
    h4 {
      text-align: center;
      font-size: 24px;
      font-weight: 300;
      line-height: 32px;
      margin-bottom: 50px;
    }
    button {
      width: 170px;
      height: 50px;
      border-radius: 25px;
      background-color: #000000;
      color: white;
    }
  }
}

// // // // CURSOR STYLES  // // // // // //

.cursor {
  position: fixed;
  z-index: 9999;
}

.instant_move {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
}

.default_circle {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: black;
  pointer-events: none;
  transition: 0.5s;
  transition-property: background-color;
  position: fixed;
  z-index: 9999;
}

.bg_circle {
  width: 30px;
  height: 30px;
  position: fixed;
  z-index: 9999;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  background-color: transparent;
  pointer-events: none;
  transition: 0.5s;
  transition-property: width, height, border-style, opacity, background-color,
    border-color;
}

.arrow {
  position: fixed;
  z-index: 100;
  opacity: 0;
  transform: translate(-100px, -100px);
  transition: 0.5s;
  img {
    opacity: 0.5;
    transform: rotate(180deg);
  }
}

.cursor_country {
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 50%;
  position: fixed;
  transform: translate(-15px, -15px) rotate(45deg);
  z-index: 9999;
  opacity: 0;
  transition: 0.5s;
  &::after {
    content: "";
    position: absolute;
    transform: translate(12px, 3px) rotate(135deg);
    width: 2px;
    height: 20px;
    background-color: white;
  }
  &::before {
    content: "";
    position: absolute;
    transform: translate(12px, 3px) rotate(45deg);
    width: 2px;
    height: 20px;
    background-color: white;
  }
}

.feedback_section_cursor {
  .default_circle {
    background-color: white;
  }
  .bg_circle {
    border-color: white;
  }
}

.display_cursor_country {
  .instant_move {
    .arrow {
      opacity: 0;
    }
    .default_circle {
      opacity: 0;
    }
    .cursor_country {
      opacity: 1;
    }
  }
  .bg_circle {
    opacity: 0;
  }
}

.display_arrow {
  .instant_move {
    .arrow {
      opacity: 1;
    }
    .default_circle {
      opacity: 0;
    }
    .cursor_country {
      opacity: 0;
    }
  }
  .bg_circle {
    opacity: 0;
  }
}

.display_small_cursor {
  .instant_move {
    .arrow {
      opacity: 0;
    }
    .default_circle {
      opacity: 1;
    }
    .cursor_country {
      opacity: 0;
    }
  }
  .bg_circle {
    opacity: 0;
  }
}

// .bg_circle_header_anim {
//   width: 40px;
//   height: 40px;
//   border: 3px dotted rgba(0, 0, 0, .3);
//   animation: bgheader  4s infinite;
// }

// @keyframes bgheader {
//   from {transform: rotate(0deg)}
//   to {transform: rotate(180deg)}
// }

// // // // MODAL WINDOW FOR COUNTRIES // // // //

.country_full_screen {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .country_modal_desc {
    padding: 20px;
    font-family: Montserrat;
    font-size: 20px;
    color: white;
    font-weight: 400;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.479);
  }
}

// // // // // // // // // // // // // //

@media (max-width: 1300px) {
  section {
    padding: 0 30px;
  }
}

@media (max-width: 1000px) {
  .countries_list {
    .country {
      width: calc((100% - 21px) / 2);
      overflow: hidden;
      // cursor: pointer;
      &:nth-child(even),
      &:nth-child(odd) {
        height: 345px;
      }
      &:nth-child(3n + 2) {
        height: 700px;
      }
      &:nth-child(2n + 1) {
        left: 0 !important;
      }
      &:nth-child(2n) {
        left: auto !important;
        right: 0 !important;
      }
    }
  }
  .feedback_section .feedback_form .feedback_content_wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top_block {
      width: 95%;
      margin-bottom: 30px;
    }
    .bottom_block {
      width: 95%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .address {
        text-align: center;
      }
    }
  }
}

@media (max-width: 800px) {
  .abilities_section .abilities_list {
    .ability {
      margin-bottom: 30px;
      .img_block_wrapper {
        display: none;
      }
      .desc_block {
        width: 100%;
        margin: 0;
        &:hover p {
          background-position: 0 0;
        }
        .separator {
          display: none;
        }
        .desc_block_title {
          margin: 0 auto;
          padding-bottom: 10px;
          text-align: center;
          width: fit-content;
          border-bottom: 3px solid rgba(0, 0, 0, 0.418);
          margin-bottom: 10px;
        }
        p {
          display: block;
          text-align: center;
          margin-bottom: 0;
        }
      }
    }
  }
}

@media (max-width: 650px) {
  section {
    padding: 0 15px;
  }

  .countries_list {
    .country {
      width: 100%;
      overflow: hidden;
      // cursor: pointer;
      height: 400px !important;
    }
  }
}

.dispay_arrow {
  display: none;
  .instant_move {
    display: none;
  }
  .arrow {
    opacity: 1;
  }
  .default_circle {
    opacity: 0;
  }
  .bg_circle {
    opacity: 0;
  }
}

@media (max-width: 500px) {
  #app .router_content {
    padding-top: 80px;
    .home_page_slider {
      padding: 0;
    }
  }
}

</style>