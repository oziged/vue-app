<template>
  <v-col lg="3" class="test pl-8 pt-8">
    <v-text-field :hide-details="true" label="Outlined" placeholder="Placeholder" outlined></v-text-field>
    <v-list flat>
      <v-list-item-group color="indigo">
        <v-list-item v-for="(item, i) in allPlaces" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    // model: 1 to #list-item-group > dont't know what it have to do
  }),
  computed: {
    ...mapGetters(["allUsers", "allPlans", "allPlaces"])
  }
};
</script>

<style>
</style>