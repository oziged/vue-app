<template>
  <div style="display: flex; justify-content: center;">
    <div class="left_block">
      <div class="avatar">
        <img style="display: block" src="@/assets/UserInfo/UserDefaultAvatar.png" alt />
        <div class="avatar_menu">
          <ul>
            <li>Change avatar</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right_block">
      <div class="information">
        <h2 class="first_name">Bad Trip Company</h2>
        <div class="rating">
          <span>RATING</span>
          <div style="display: flex; align-items: center">
            <div style="line-height: normal;">3/5</div>
            <v-rating :value="5" readonly background-color="green lighten-3" color="green"></v-rating>
          </div>
        </div>
        <div class="location">
          <span>LOCATION</span>
          <div>New York, Saint st.</div>
        </div>
      </div>
      <div class="interactive">
        <v-btn color="success" dark>SEND MESSAGE</v-btn>
        <v-btn color="success" dark>REPORT USER</v-btn>
      </div>
    </div>
    <!-- <modal-window :value="true">123321</modal-window> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalWindow from '../ModalWindow'

export default {
  components: {
    ModalWindow
  },
  data() {
    return {
      user: null
    };
  },
  props: ["id"],
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.user = this.getUser(this.id);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.left_block {
  .avatar {
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    &:hover {
      .avatar_menu {
        opacity: 1;
        max-height: 30px;
      }
    }
    .avatar_menu {
      width: 100%;
      text-align: center;
      transition: 0.5s;
      opacity: 1;
      max-height: 0;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 0;
      left: 0;
    }
    ul {
      padding: 0;
      li {
        cursor: pointer;
        color: white;
        list-style-type: none;
      }
    }
  }
}

.right_block {
  font-size: 22px;
  margin-left: 50px;
  .information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rating,
    .location {
      margin-bottom: 10px;
      span {
        font-size: 16px;
        font-weight: bold;
        color: rgba(146, 146, 146);
      }
      .v-rating {
        margin-left: 10px;
      }
    }
  }
  .interactive {
    .v-btn {
      margin-right: 15px;
    }
  }
}

.first_name {
  width: fit-content;
  padding-bottom: 5px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
</style>

<style lang="scss">
.right_block .information .v-rating .v-icon {
  padding: 0.5rem 2px !important;
  transform: scale(1.2);
}
</style>