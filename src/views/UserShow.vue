<template>
  <div style="padding-top: 20px; margin: 0 auto; max-width: 1250px;">
    <user-info :id="$route.params.id" />
  </div>
</template>

<script>
import UserInfo from "../components/UserShow/UserInfo";

export default {
  components: {
    UserInfo
  }
};
</script>

<style>
</style>