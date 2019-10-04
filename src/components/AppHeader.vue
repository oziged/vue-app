<template>
  <header>
    <div class="nav_list">
      <router-link class="nav_item_logo" to="/">
        <img src="../assets/logo.png" alt />
      </router-link>
      <router-link class="nav_item" to="/plans">
        <span>Plans</span>
      </router-link>
      <router-link class="nav_item" to="/plan/1">
        <span>Plan1</span>
      </router-link>
      <router-link class="nav_item" to="/plan/2">
        <span>Plan2</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 80px;
  position: relative;
  background: white;
  z-index: 10;
  transition: 0.3s;
  box-shadow: 0 0 4px 0px #00000036;
  &:hover {
    background-color: #f8fff5;
  }

  .nav_list {
    height: 100%;
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
  }

  .nav_item {
    color: rgb(11, 99, 61);
    text-decoration: none;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    &_logo {
      display: flex;
      align-items: center;
      img {
        height: 70px;
      }
    }
    span {
      border-bottom: 2px solid rgba(11, 99, 61, 0);
      transition: 0.3s;
    }
    &:hover {
      span {
        border-bottom: 2px solid rgba(11, 99, 61, 0.3);
      }
    }
  }
}

@media (max-width: 1300px) {
  header .nav_list {
    margin: 0 20px;
  }
}
</style>