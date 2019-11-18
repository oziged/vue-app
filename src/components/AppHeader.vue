<template>
  <header>
    <div class="nav_list">
      <div class="left_block">
        <router-link class="nav_item_logo" to="/">
          <span>travel.</span>
        </router-link>
      </div>
      <div class="right_block">
        <router-link class="nav_item" to="/plans">
          <span>Plans</span>
        </router-link>
        <router-link class="nav_item" to="/auth">
          <span>Join us</span>
        </router-link>
      </div>
      <div
        class="mobile_burger"
        :class="{burger_is_opened: burgerIsOpened}"
        @click="burgerIsOpened = !burgerIsOpened"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <transition name="fade">
        <div
          class="mobile_menu_list"
          ref="mobileMenu"
          :style="{top: `${offsetY}px`}"
          v-if="burgerIsOpened"
          v-click-outside="closeBurger"
        >
          <router-link class="nav_item" to="/plans" @click.native="closeBurger">
            <span>Plans</span>
          </router-link>
          <router-link class="nav_item" to="/plan/1" @click.native="closeBurger">
            <span>Plan1</span>
          </router-link>
          <router-link class="nav_item" to="/plan/2" @click.native="closeBurger">
            <span>Plan2</span>
          </router-link>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      burgerIsOpened: false,
      offsetY: 80
    };
  },
  methods: {
    setHeaderAnimation() {
      document.addEventListener("scroll", e => {
        if (window.pageYOffset > 100) {
          this.$el.style.height = "50px";
          this.offsetY = 50;
        } else if (window.pageYOffset < 50) {
          this.$el.style.height = "80px";
          this.offsetY = 80;
        }
      });
    },
    closeBurger(e) {
      if (e.target.closest('.mobile_burger')) return;
      this.burgerIsOpened = false;
    }
  },
  mounted() {
    this.setHeaderAnimation();
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  z-index: 101;
  box-shadow: 0 0 4px 0px #00000036;
  transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  &:hover {
    background-color: #F6FBFA;
  }

  .nav_list {
    height: 100%;
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left_block,
  .right_block {
    display: flex;
  }

  .nav_item {
    color: rgb(11, 99, 61);
    text-decoration: none;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    // width: 60px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Montserrat;
      font-size: 30px;
      font-weight: 700;
      color: black;
      text-decoration: none;
    }
    span {
      padding-top: 4px;
      border-bottom: 2px solid rgba(11, 99, 61, 0);
      transition: 0.3s;
    }
    &:hover {
      span {
        border-bottom: 2px solid rgb(250, 250, 250);
      }
    }
  }



  .mobile_burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    // cursor: pointer;
    span {
      transition: 0.3s;
      display: block;
      width: 30px;
      height: 5px;
      background-color: black;
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
      &:nth-child(2) {
        transition: 0.2s;
      }
    }
  }

  .mobile_menu_list {
    position: absolute;
    left: 0;
    top: 80px;
    width: 100%;
    box-shadow: 0 0 4px 0px #00000036;
    transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
    .nav_item {
      background-color: #ffffff;
      border-bottom: 2px solid #10101009;
      &:last-child {
        border-bottom: none;
      }
      span {
        display: block;
        margin: 0 auto;
      }
    }
  }

  .burger_is_opened {
    span {
      &:first-child {
        transform: translateY(10px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:last-child {
        transform: translateY(-10px) rotate(-45deg);
      }
    }
  }
}

@media (max-width: 1300px) {
  header .nav_list {
    margin: 0 30px;
  }
}

@media (max-width: 600px) {
  .nav_list .right_block {
    display: none;
  }

  .nav_list .mobile_burger {
    display: flex;
  }
}
</style>