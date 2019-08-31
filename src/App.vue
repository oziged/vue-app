<template>
  <v-app>
    <v-row>
      <app-header/>
      <router-view></router-view>
      <!-- <routes-list :changeLatLng="changeLatLng" :items="items"/> -->
      <!-- <app-map/> -->
    </v-row>
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
