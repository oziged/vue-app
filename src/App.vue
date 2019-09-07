<template>
  <v-app>
    <div>
      <app-header />
      <router-view class="content" :key="$route.fullPath"></router-view>
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
#app {
  // background-color: rgb(218, 208, 208);
}

.content {
  min-height: calc(100vh - 80px);
  background-color: white;
  // background-color: rgba(169, 255, 212, .2);
}

* {
  box-sizing: border-box;
}

/* VUETIFY STYLES FIX */
.v-application--wrap {
  // background-color: rgb(180, 255, 183);
}

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
