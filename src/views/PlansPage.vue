<template>
  <div>
    <checkpoints-list/>
    <app-map/>
  </div>

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
