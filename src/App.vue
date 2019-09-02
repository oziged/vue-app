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
</style>
