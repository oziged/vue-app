<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
    <v-row>
      <routes-list :changeLatLng="changeLatLng" :items="items"/>
      <app-map :lat="lat" :lng="lng" :items="items"/>
    </v-row>
    </v-content>
  </v-app>
</template>

<script>
import RoutesList from './components/RoutesList';
import AppMap from './components/AppMap';
import { constants } from 'crypto';

export default {
  name: 'App',
  components: {
    RoutesList,
    AppMap
  },
  data: () => ({
    lat: 10,
    lng: 10,
     items: [
        {
          text: 'lat = 10, lng = 20',
          lat: 10,
          lng: 20
        },
        {
          text: 'lat = 0, lng = 20',
          lat: 0,
          lng: 20
        },
        {
          text: 'lat = 40, lng = 30',
          lat: 40,
          lng: 30
        },
      ],
      markers: [
        {
          position: {
            lat: 10,
            lng: 20
          }
        }
      ]
  }),
  methods: {
    changeLatLng(item) {
      this.lat = item.lat;
      this.lng = item.lng;
      console.log(this.lat)
    }
  }
};
</script>
