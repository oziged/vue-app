<template>
  <header>
    <div class="nav_list">
      <div class="left_block">
        <router-link class="nav_item_logo" to="/">
          <span>travel.</span>
        </router-link>
      </div>
      <div class="menu" @click.stop="toggleMenu" v-click-outside="closeMenu">
        <div class="menu_icon" @click.stop="toggleMenu" :style="`width: ${offsetY * .6}px`">
          <img src="@/assets/avatar.jpg" alt />
        </div>
        <div class="menu_arrow" :class="{active: menuIsOpened}" @click.stop="toggleMenu"></div>
        <div class="menu_dropdown" :style="`top: ${offsetY}px`">
          <div class="dropdown_item user_info">
            <span class="user_name">Homer Simpson</span>
            <button class="user_logout" @click.stop="closeMenu">Logout</button>
          </div>
          <div class="dropdown_item default" @click.stop="toggleNewPlanModal">
            <span>Create plan</span>
          </div>
          <router-link to="/plans">
            <div class="dropdown_item default" @click.native="closeMenu">
              <span>All plans</span>
            </div>
          </router-link>
          <!-- <div class="dropdown_item default" @click.stop="closeMenu">
               <span>Profile settings</span>
          </div>-->
          <router-link to="/auth">
            <div class="dropdown_item default" @click.native="closeMenu">
              <span>Demo auth page</span>
            </div>
          </router-link>
          <div class="dropdown_item bottom" @click.stop="closeMenu">
            <span>Check for updates</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mobile_burger"
      :class="{burger_is_opened: burgerIsOpened}"
      @click="burgerIsOpened = !burgerIsOpened"
    >
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
import TweenMax from "gsap";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      burgerIsOpened: false,
      offsetY: 80,
      menuIsOpened: false
    };
  },
  methods: {
    ...mapActions(["toggleNewPlanModal"]),
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
      if (e.target.closest(".mobile_burger")) return;
      this.burgerIsOpened = false;
    },
    toggleMenu() {
      console.log("toggling");
      this.menuIsOpened = !this.menuIsOpened;
    },
    closeMenu() {
      console.log("closed");
      if (!this.menuIsOpened) return;
      this.menuIsOpened = false;
    }
  },
  mounted() {
    this.setHeaderAnimation();
  },
  watch: {
    menuIsOpened(bool) {
      let dropdown = document.querySelector(".menu_dropdown");
      if (bool) {
        TweenMax.set(dropdown, { height: "auto", autoAlpha: 0 });
        TweenMax.from(dropdown, 0.6, { height: 0 });
        TweenMax.to(dropdown, 0.6, { autoAlpha: 1 });
      } else {
        TweenMax.to(dropdown, 0.6, { height: 0, autoAlpha: 0 });
      }
    }
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
    background-color: #f6fbfa;
  }

  .nav_list {
    height: 100%;
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .menu {
      cursor: pointer;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Montserrat;
      .menu_icon {
        height: 60%;
        transition: 0.5s;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          bottom: -3px;
          right: -2px;
          width: 20%;
          height: 20%;
          box-sizing: content-box;
          border: 3px solid white;
          border-radius: 50%;
          background-color: #62e898;
        }
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .menu_arrow {
        width: 30px;
        height: 100%;
        position: relative;
        &::after,
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 1.5px;
          background-color: rgba(0, 0, 0, 0.521);
          transition: 0.3s;
        }
        &::after {
          transform: translate(-20%, -50%) rotate(45deg);
        }
        &::before {
          transform: translate(-80%, -50%) rotate(-45deg);
        }
      }
      .active {
        &::after {
          transform: translate(-20%, -50%) rotate(-45deg);
        }
        &::before {
          transform: translate(-80%, -50%) rotate(45deg);
        }
      }
      .menu_dropdown {
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: 0 0 5px #00000038;
        display: block;
        height: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        transition: top 0.3s;
        width: 300px;
        top: 100%;
        .dropdown_item {
          box-shadow: -2px 1px 4px 0px #00000011;
          padding: 10px;
          width: 100%;
          background-color: #fffffff5;
          background-color: #fafbfd;
        }
        .user_info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .user_name {
            font-weight: 500;
            letter-spacing: -0.5px;
            font-size: 14px;
            display: flex;
            align-items: center;
            &::before {
              content: "";
              width: 8px;
              height: 8px;
              margin-right: 8px;
              border-radius: 50%;
              background-color: #62e898;
            }
          }
          .user_logout {
            padding: 5px 15px;
            font-size: 10px;
            border-radius: 20px;
            color: white;
            background-color: black;
          }
        }
        .default {
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.2s;
          &:hover {
            background-color: #f4fbfa;
          }
        }
        .bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          // border-radius: 0 0 20px 20px;
          background-color: #cce4e6;
        }
      }
    }
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

  header .nav_list .menu .menu_dropdown {
    position: fixed;
    width: 95%;
    left: 2.5%;
    .dropdown_item {
      height: 70px;
    }
  }

  header .nav_list .menu .user_info {
    flex-direction: column;
  }
}
</style>