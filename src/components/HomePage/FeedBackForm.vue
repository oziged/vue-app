<template>
  <form action @submit.prevent="validateForm" novalidate="true">
    <div class="input-box">
      <input type="text" v-model="name" />
      <div class="label">
        <label>Name</label>
        <transition name="fade">
          <span v-if="errors.name.length > 0">{{ ` | ${errors.name.join(', ')}`}}</span>
        </transition>
      </div>
    </div>
    <div class="input-box">
      <input type="text" v-model="email" />
      <div class="label">
        <label>Email</label>
        <transition name="fade">
          <span v-if="errors.email.length > 0">{{ ` | ${errors.email.join(', ')}`}}</span>
        </transition>
      </div>
    </div>
    <div class="input-box">
      <textarea name id cols="30" rows="4" v-model="message" />
      <div class="label">
        <label>Message</label>
        <transition name="fade">
          <span v-if="errors.message.length > 0">{{ ` | ${errors.message.join(', ')}`}}</span>
        </transition>
      </div>
    </div>
    <input type="submit" value="Submit" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      errors: {
        name: [],
        email: [],
        message: []
      }
    };
  },
  methods: {
    validateForm() {
      Object.keys(this.errors).forEach(item => (this.errors[item] = []));
      if (this.name.length < 2) this.errors.name.push("required");
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
        this.errors.email.push("incorrect email");
      if (this.message.length < 20)
        this.errors.message.push("must be at least 20 symbols");
    }
  },
  mounted() {
    this.$el.querySelectorAll(".input-box").forEach(item => {
      let input = item.querySelector("input") || item.querySelector("textarea");
      let label = item.querySelector(".label");
      input.addEventListener("focus", () => {
        label.style.top = "-25px";
      });
      input.addEventListener("blur", () => {
        input.value.length == 0 ? (label.style.top = "0") : "";
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  input {
    border-style: none;
    background: transparent;
    border-bottom: 1px solid white;
    width: calc(100% - 100px);
    position: relative;
    outline: none;
    padding: 10px 0;
    color: white;
    font-size: 18px;
    margin-bottom: 30px;
    &:focus ~ label,
    &:valid ~ label {
      top: -25px;
    }
  }
}
.input-box {
  position: relative;
  textarea {
    border-bottom: 1px solid white;
    resize: none;
    outline: none;
    width: calc(100% - 100px);
    padding: 10px 0;
    margin-bottom: 30px;
    &:focus ~ label,
    &:valid ~ label {
      top: -25px;
    }
  }
}

input[type="submit"] {
  background-color: white;
  padding: 10px 40px;
  color: black;
  border-radius: 30px;
  cursor: pointer;
}

.input-box,
.textarea-box {
  .label {
    color: white;
    position: absolute;
    padding: 10px 0;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: 0.5s;
    span {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>