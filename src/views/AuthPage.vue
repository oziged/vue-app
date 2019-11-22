<template>
  <div>
    <div :class="{auth_form: true, mobile: windowWidth <= 1000}">
      <img class="geometry_white_bg" src="@/assets/AuthPage/geometry_white_bg.jpg" alt="">
      <div class="small_block">
        <img class="geometry_bg" src="@/assets/AuthPage/geometry_bg.jpg" alt="">
        <div class="button" @click="toggleAuth"><span>{{ `${mode == 'signup' ? 'sign in' : 'sign up'}` }}</span></div>
      </div>
      <div class="big_block">
        <div class="signup" v-if="mode == 'signup'">
          <h1>Create account</h1>
          <div class="inputs">
            <input type="text" placeholder="Name">
            <input type="text" placeholder="Email">
            <input type="text" placeholder="Password">
          </div>
          <div class="signup_button">sign up</div>
        </div>

        <div class="signin" v-if="mode == 'signin'">
          <h2>Sign in to travel.</h2>
          <div class="inputs">
            <input type="text">
            <input type="text">
          </div>
          <div class="signin_button">sign in</div>
        </div>
      </div>

      <div class="static_elements_left">
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
      </div>
      <div class="static_elements_right">
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and start journey with us</p>
      </div>
    </div>
  </div>
</template>

<script>
import {TweenMax, TimelineMax} from "gsap"
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      mode: "signup",
      mobile: this.windowWidth > 1000 ? false : true
    }
  },
  methods: {
    toggleAuth() {
      if (this.mode == 'signup') {
        setTimeout(() => {
          this.mode = 'signin'
        }, 550);

        if (this.windowWidth > 1000) {

        TweenMax.to('.static_elements_left', .3, {
          x: -100,
          opacity: 0,
          zIndex: -1,
          delay: .2
        })

        TweenMax.to('.small_block', .3, {
          width: '50%',
        })

        TweenMax.to('.small_block', 1.2, {
          left: '50%',
          delay: .1,
          ease: Power1.easeOut
        })

        TweenMax.to('.small_block', 1, {
          left: '60%',
          width: '40%',
          delay: .7,
        })

        let tl = new TimelineMax();

        tl.to('.small_block .button span', .5, {
          x: -50,
          opacity: 0,
        })

        tl.set('.small_block .button span', {
          x: 50,
        })

        tl.to('.small_block .button span', .5, {
          x: 0,
          opacity: 1,
          delay: .7
        })
   
        ///

        TweenMax.to('.big_block', 1.5, {
          left: '0%',
          ease:Linear.easeNone
        })

        TweenMax.to('.static_elements_right', 1, 
        {
          x: 0,
          opacity: 1,
          delay: 1,
          zIndex: 1
        })
      } else {
        TweenMax.to('.auth_form', .5, {
          opacity: 0,
        })
        TweenMax.to('.auth_form', .5, {
          opacity: 1,
          delay: .55
        })
        TweenMax.to('.static_elements_left', 0, {
          opacity: 0,
          delay: .55
        })
        TweenMax.to('.static_elements_right', 0, {
          opacity: 1,
          delay: .55
        })
      }
      }

      if (this.mode == 'signin') {
        setTimeout(() => {
          this.mode = 'signup'
        }, 550);

        if (this.windowWidth > 1000) {
        TweenMax.to('.static_elements_right', .5, {
          x: 100,
          opacity: 0,
          zIndex: -1,
          delay: .2
        })

        TweenMax.to('.small_block', .3, {
          width: '50%',
          delay: .1
        })

        TweenMax.to('.small_block', 1.2, {
          left: '0%',
          delay: .1,
          ease: Power1.easeOut
        })

        TweenMax.to('.small_block', 1, {
          left: '0%',
          width: '40%',
          delay: .7,
        })

        let tl = new TimelineMax();

        tl.to('.small_block .button span', .5, {
          x: 50,
          opacity: 0,
        })

        tl.set('.small_block .button span', {
          x: -50,
        })

        tl.to('.small_block .button span', .5, {
          x: 0,
          opacity: 1,
          delay: .7
        })

        TweenMax.to('.big_block', 1.5, {
          left: '40%',
          ease:Linear.easeNone
        })

        TweenMax.to('.static_elements_left', .5, 
        {
          x: 0,
          opacity: 1,
          delay: 1,
          zIndex: 1
        })

        } else {
        TweenMax.to('.auth_form', .5, {
          opacity: 0,
        })
        TweenMax.to('.auth_form', .5, {
          opacity: 1,
          delay: .55
        })
        TweenMax.to('.static_elements_right', 0, {
          opacity: 0,
          delay: .55
        })
        TweenMax.to('.static_elements_left', 0, {
          opacity: 1,
          delay: .55
        })
        }
        }
    }
  },
  computed: {
    ...mapGetters(["windowWidth"]),
  },
  watch: {
    windowWidth(newValue) {
      if (this.mobile && newValue > 1000) {this.mobile = false; this.mode = 'signup'}
      else if (!this.mobile && newValue < 1000) {this.mobile = true; this.mode = 'signup'}
    },
    mobile() {
      document.querySelectorAll('.small_block, .big_block, .static_elements_left, .static_elements_right').forEach(item => item.removeAttribute('style'))
    }
  }
}
</script>

<style lang="scss" scoped>
  .auth_form {
    width: 100%;
    height: 100%;
    max-width: 1250px;
    max-height: 1000px;
    min-height: 680px;
    height: calc(100vh - 120px);
    border-radius: 30px;
    box-shadow: 0 0 7px 0px #00000017;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 20px;
    font-family: Montserrat;
    .geometry_white_bg {
      position: absolute;
      opacity: .1;
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
    .small_block {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 40%;
      height: 100%;
      background-color: #3BB397;
      .geometry_bg {
        position: absolute;
        z-index: -1;
        opacity: .1;
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
      .button {
        width: 60%;
        height: 60px;
        border: 2px solid white;
        border-radius: 70px;
        position: absolute;
        left: 50%;
        top: 55%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
          text-transform: uppercase;
          letter-spacing: 3px;
          color: white;
        }
      }
    }
    .big_block {
      position: absolute;
      left: 40%;
      top: 0;
      width: 60%;
      height: 100%;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;

      .signup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        h1 {
          color: #5AB0A3;
        }
        .inputs {
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 20px auto;
          input {
            background-color: #F4F8F7;
            height: 50px;
            margin-bottom: 10px;
            padding: 10px;
            &:focus {
              outline: none
            }
          }
        }
        .signup_button {
          width: 250px;
          height: 60px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 4px;
          background-color: #5AB0A3;
          border-radius: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }

      .signin {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        h1 {
          color: #5AB0A3;
        }
        .inputs {
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 20px auto;
          input {
            background-color: #F4F8F7;
            height: 50px;
            margin-bottom: 10px;
          }
        }
        .signin_button {
          width: 250px;
          height: 60px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 4px;
          background-color: #5AB0A3;
          border-radius: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }
    .static_elements_left {
      position: absolute;
      z-index: 2;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      left: 0;
      top: 35%;
      h1 {
        color: white;
      }
      p {
        width: 300px;
        font-size: 18px;
        text-align: center;
        color: white;
      }
    }

    .static_elements_right {
      position: absolute;
      z-index: 2;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      right: 0;
      top: 35%;
      opacity: 0;
      h1 {
        color: white;
      }
      p {
        width: 300px;
        font-size: 18px;
        text-align: center;
        color: white;
      }
    }
  }

  @media (max-width: 1300px) {
  .router_content {
    padding: 0 30px;
  }

  @media (max-width: 1000px) {
    .mobile {
      .small_block {
        width: 100%;
        height: 50%;
        left: 0;
        top: 0;
        .button {
          top: 60%;
          width: 250px;
        }
      }
      .static_elements_left, .static_elements_right {
        width: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 22%;
      }
      .big_block {
        width: 100%;
        height: 50%;
        left: 0;
        top: 50%;
      }
    }
  }
}
</style>