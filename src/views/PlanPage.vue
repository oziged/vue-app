<template>
  <div>
    <plan :id="$route.params.id"/>
  </div>
</template>

<script>
import Plan from '../components/Plan'

export default {
  components: {
    Plan
  }
}
</script>

<style>

</style>