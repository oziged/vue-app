<template>
  <v-row>
    <routes-list/>
    <app-map/>
  </v-row>
</template>

<script>
import RoutesList from '../components/RoutesList';
import AppMap from '../components/AppMap';

export default {
  components: {
    RoutesList,
    AppMap
  },
};
</script>
