<template>
  <v-app>
    <div>
      <app-header />
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
#app {
  background-color: rgb(250, 250, 250);
}

* {
  box-sizing: border-box;
}

/* VUETIFY STYLES FIX */
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
