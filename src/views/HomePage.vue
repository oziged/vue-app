<template>
  <div>
    <section>
      <home-page-slider class="home_page_slider">
        <div
          class="home_page_slide slide1"
          style="background: url('http://www.dalenawatson.com/wp-content/uploads/2017/09/girl-sun-2.jpg') no-repeat center center/cover"
        >
          <div class="content">
            <h2>we are travel.</h2>
            <div class="separator"></div>
            <h4>
              proffesionals
              <br />in create industries
            </h4>
            <button>get in touch</button>
          </div>
        </div>
        <div
          class="home_page_slide"
          style="background: url('https://bigseventravel.com/wp-content/uploads/2019/08/Screenshot-2019-08-14-at-12.20.27.png') no-repeat center center/cover"
        >
          <p>here just PARAGRAPH</p>
        </div>
        <div
          class="home_page_slide"
          style="background: url('https://www.intrepidtravel.com/adventures/wp-content/uploads/2016/08/Solo-travel-Intrepid.jpg') no-repeat center center/cover"
        ></div>
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
              <h5>creative</h5>
              <h5>kitchen</h5>
            </div>
            <div class="separator"></div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              <br />
              <br />Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
        <div class="ability">
          <div class="img_block_wrapper">
            <div class="img_block"></div>
          </div>
          <div class="desc_block">
            <div class="desc_block_title">
              <h5>creative</h5>
              <h5>kitchen</h5>
            </div>
            <div class="separator"></div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              <br />
              <br />Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
        <div class="ability">
          <div class="img_block_wrapper">
            <div class="img_block"></div>
          </div>
          <div class="desc_block">
            <div class="desc_block_title">
              <h5>creative</h5>
              <h5>kitchen</h5>
            </div>
            <div class="separator"></div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              <br />
              <br />Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="countries_section">
      <h2 class="home_page_title">trending countries</h2>
      <magic-grid class="countries_list" :gap="10" :maxColWidth="9999" style="margin-bottom: 50px">
        <div class="country">
          <img src="https://cdn.tourradar.com/s3/content-pages/16/1024x768/gxvKGa.jpg" alt />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" style="display: block;" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country">
          <img src="https://www.planetware.com/photos-large/USNY/usa-best-places-new-york.jpg" alt />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" style="display: block;" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country">
          <img
            src="https://handluggageonly.co.uk/wp-content/uploads/2018/02/Hand-Luggage-Only-8-5.jpg"
            alt
          />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" style="display: block;" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country">
          <img
            src="https://www.ktchnrebel.com/wp-content/uploads/2019/03/Working-in-Mexico-City-KTCHNrebel-copyright-Fotolia-javarman.jpg"
            alt
          />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" style="display: block;" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country">
          <img
            src="https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/thailand-1200x819.jpg"
            alt
          />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" style="display: block;" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
        <div class="country">
          <img
            src="https://afar-production.imgix.net/uploads/syndication/holland_americas/images/h9B977Yqvt/original_ESY-013403436.Berlin.Hero.AGE.crop.jpg?w=750&h=563&fit=crop"
            alt
          />
          <div class="country_desc">
            <h3>USA</h3>
            <country-flag country="usa" size="big" style="display: block;" />
            <span>The great American experience is about so many things: bluegrass and beaches, snow-covered peaks and redwood forests, restaurant-loving cities and big open skies.</span>
          </div>
          <div class="hover_bg"></div>
        </div>
      </magic-grid>
    </section>
    <section class="feedback_section">
      <div class="feedback_form">
        <div class="feedback_form_title">get in touch</div>
        <div class="left_block">
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
        <div class="right_block">
          <feed-back-form />
        </div>
      </div>
    </section>
    <footer>
      <div class="year">2019 travel.</div>
      <div class="rights">all right reserved</div>
    </footer>
  </div>
</template>

<script>
import HomePageSlider from "../components/HomePage/HomePageSlider";
import FeedBackForm from "../components/HomePage/FeedBackForm";

export default {
  components: {
    HomePageSlider,
    FeedBackForm
  },
  methods: {
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
section, footer {
  font-family: Montserrat;
}

.home_page_slider {
  margin: 50px auto 0 auto;
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
  margin: 80px auto;
  width: fit-content;
}

.home_page_slide::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-color: #ffe1bd;
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
  .country {
    width: calc((100% - 30px) / 3);
    overflow: hidden;
    cursor: pointer;
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
      padding-right: 20px;
      z-index: 10;
      color: white;
      position: absolute;
      font-family: Montserrat;
      opacity: 0;
      transition: 0.3s;
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
  .left_block {
    width: 50%;
    display: inline-block;
    .address,
    .number,
    .email {
      display: flex;
      margin-bottom: 35px;
      .img_block {
        margin-right: 20px;
        img {
          height: 100%;
          width: 100%;
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
  .right_block {
    width: 50%;
    display: inline-block;
    vertical-align: top;
    .input-box {
      position: relative;
      input {
        border-style: none;
        background: transparent;
        border-bottom: 1px solid white;
        width: calc(100% - 100px);
        position: relative;
        outline: none;
        padding: 10px 0;
        color: white;
        font-size: 18px;
        margin-bottom: 30px;
        &:focus ~ label,
        &:valid ~ label {
          top: -25px;
        }
      }
      label {
        color: white;
        position: absolute;
        padding: 10px 0;
        top: 0;
        left: 0;
        pointer-events: none;
        transition: 0.5s;
      }
    }
    input[type="submit"] {
      background-color: white;
      padding: 10px 40px;
      color: black;
      border-radius: 30px;
      cursor: pointer;
    }
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
</style>