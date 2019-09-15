<template>
  <v-dialog :value="true" @input="input" width="80vw">
    <v-card>
      <div class="checkpoint_new_modal">
        <v-form v-model="valid">
          <v-text-field
            label="Title"
            v-model="title"
            :rules="titleRules"
            color="green"
            outlined
            required
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="description"
            auto-grow
            rows="4"
            row-height="25"
            color="green"
            outlined
            required
          ></v-textarea>
          <v-text-field
            label="Map Place"
            v-model="mapPlace"
            color="green"
            outlined
            required
          ></v-text-field>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      valid: false,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ]
    };
  }
};
</script>

<style>
.checkpoint_new_modal {
  padding: 20px;
}
</style>