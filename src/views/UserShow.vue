<template>
  <div class="wrapper">
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

<style lang="scss" scoped>
.wrapper {
  max-width: 1250px;
}
</style>>