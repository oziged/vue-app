<template>
  <modal-window :value="value" @input="input" height='auto'>
    <div class="plan_new_modal">
      <v-form ref="form">
        <v-text-field
          label="Title"
          v-model="title"
          color="green"
          outlined
          required
          :rules="titleRules"
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="description"
          rows="4"
          row-height="25"
          color="green"
          outlined
          required
          :rules="descriptionRules"
        ></v-textarea>
      </v-form>
      <v-btn class="save_plan" @click="submit" color="success" dark>save plan</v-btn>
    </div>
  </modal-window>
</template>

<script>
import axios from 'axios';

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
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 20 || "Name must be less than 30 characters"
      ],
      descriptionRules: [
        v => !!v || "Description is required",
        v => v.length <= 5000 || "Description must be less than 5000 characters"
      ],
    }
  },


  methods: {
    ...mapActions(["newPlan", "toggleNewPlanModal"]),
    
    async submit() {
      if (!this.$refs.form.validate()) return;

      axios.post('http://localhost:3000/api/plans', {
        title: this.title,
        description: this.description
      })
      .then(response => {
        let data = response.data;
        this.toggleNewPlanModal();
        this.$router.push(`/plans/${data.id}`)
      })
      

      // let newPlan = await this.newPlan({
      //   title: this.title,
      //   description: this.description
      // })

      // this.toggleNewPlanModal();
      // this.$router.push(`/plans/${newPlan.id}`)
    },

    input() {
      this.$emit('input');
      this.title = "";
      this.description = "";
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