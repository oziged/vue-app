<template>
  <v-app>
      <div>
      <app-header/>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
  #app {
    background-color: white;
  }

  * {
    box-sizing: border-box;
  }
</style>
