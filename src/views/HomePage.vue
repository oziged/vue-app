<template>
  <div>
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
    <h2 class="home_page_title">most popular plans</h2>
  </div>
</template>

<script>
import HomeMap from "../components/HomePage/HomeMap";
import HomePageSlider from "../components/HomePage/HomePageSlider";
export default {
  components: {
    HomePageSlider
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
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
    .img_block_wrapper {
      width: calc(50% - 20px);
      margin-right: 20px;
      height: 500px;
      perspective: 1000px;
    }
    .img_block {
      width: 100%;
      height: 100%;
      // width: calc(50% - 20px);
      // margin-right: 20px;
      // height: 500px;
      background: url("https://www.sassyhongkong.com/wp-content/uploads/2018/07/travel-lessons-learned-minimalist-1.jpg")
        no-repeat center center/cover;
    }
    .desc_block {
      width: calc(50% - 50px);
      font-family: Montserrat;
      font-size: 30px;
      font-weight: 300;
      margin-left: 50px;
      &:hover {
        .separator {
          width: 90px;
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
      }
    }
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
      font-family: Montserrat;
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
      font-family: Montserrat;
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
      font-family: Montserrat;
    }
  }
}
</style>