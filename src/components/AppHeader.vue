<template>
  <header>
    <div class="nav_list">
      <router-link class="nav_item_logo" to="/"><img src="../assets/logo.png" alt=""></router-link>
      <router-link class="nav_item" to="/plans"><span>Plans</span></router-link>
      <router-link class="nav_item" to="/"><span>Link</span></router-link>
      <router-link class="nav_item" to="/"><span>Link</span></router-link>
      <router-link class="nav_item" to="/"><span>Link</span></router-link>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    header {
      width: 100%;
      height: 80px;
      background: white;
      transition: .3s;
      &:hover {
        background-color: rgba(198, 255, 210, 0.164);
      }

      .nav_list {
        height: 100%;
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
          transition: .3s;
        }
        &:hover {
          span {
            border-bottom: 2px solid rgba(11, 99, 61, .3)
          }
        }
      }
    }
</style>