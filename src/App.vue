<template>
  <v-app>
    <div>
      <app-header />
      <transition name="router-anim" mode="out-in">
        <router-view class="content" :key="$route.fullPath"></router-view>
      </transition>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import AppHeader from "./components/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader
  },
  mounted() {}
};
</script>

<style lang="scss">
.router-anim-enter-active,
.router-anim-leave-active {
  transition: all 0.3s;
}

.router-anim-enter,
.router-anim-leave-to {
  opacity: 0;
}

#app {
  background-color: white;
}

.content {
  min-height: calc(100vh - 80px);
  background-color: white;
}

* {
  box-sizing: border-box;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* VUETIFY STYLES FIX */

  // .range_selector input {
    // text-align: center;
  // }
.checkpoints_list {
  .v-expansion-panel {
    .v-expansion-panel-content__wrap {
      padding: 0;
      .v-expansion-panel-header {
      }
    }
  }

  .v-expansion-panel--active .v-expansion-panel-header {
    min-height: 40px;
  }

  .v-expansion-panel--active .v-item--active {
    margin-bottom: 10px;
  }

  .v-expansion-panel:before {
    box-shadow: none;
  }
  .v-expansion-panel-header {
    padding-bottom: 0;
    padding-top: 0;
  }

}
</style>
