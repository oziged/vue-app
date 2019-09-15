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
          <v-text-field ref="mapPlace" label="Map Place" color="green" outlined required></v-text-field>
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
      description: "",
      valid: false,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ]
    };
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      let input = this.$refs.mapPlace.$el.querySelector("input");
      input.placeholder = ''
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      console.log(place);
    })
    });
  }
};
</script>

<style>
.checkpoint_new_modal {
  padding: 20px;
}
</style>