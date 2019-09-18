<template>
  <div>
    <user-info :id="$route.params.id" />
  </div>
</template>

<script>
import UserInfo from "../components/UserShow/UserInfo";

export default {
  components: {
    UserInfo
  },
};
</script>

<style>
</style>