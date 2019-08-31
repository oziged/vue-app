<template>
  <v-row>
    <checkpoints-list/>
    <app-map/>
  </v-row>
</template>

<script>
import CheckpointsList from '../components/CheckpointsList';
import AppMap from '../components/AppMap';

export default {
  components: {
    CheckpointsList,
    AppMap
  },
};
</script>
