<template>
  <modal-window :value="true" @input="input" height='auto'>
    <div class="plan_new_modal">
      <v-form ref="form">
        <v-text-field
          label="Title"
          v-model="title"
          color="green"
          outlined
          required
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="description"
          rows="4"
          row-height="25"
          color="green"
          outlined
          required
        ></v-textarea>
      </v-form>
      <v-btn class="save_plan" @click="submit" color="success" dark>save checkpoint</v-btn>
    </div>
  </modal-window>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalWindow from "./ModalWindow";

export default {
  props: ["value"],
  components: {
    ModalWindow
  },
  data() {
    return {
      title: "",
      description: "",
    }
  },
  methods: {
    ...mapActions(["newPlan"]),
    async submit() {
      let newPlan = await this.newPlan({
        title: this.title,
        description: this.description
      })
      this.$router.push(`/plans/${newPlan.id}`)
    }
  },
}
</script>

<style lang="scss">
  .plan_new_modal {
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .v-form {
      width: 100%;
    }
  }
  .save_plan {
  }
</style>