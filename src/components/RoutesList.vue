<template>
  <v-col lg="3" class="test pl-8 pt-8">
    <div v-for="(user, index) in allUsers" :key="'user-'+index">{{ `${user.firstName} // ${user.lastName}` }}</div>
    <div v-for="(plan, index) in allPlans" :key="'plan-'+index">{{ `${plan.title}` }}</div>
    <v-text-field :hide-details="true" label="Outlined" placeholder="Placeholder" outlined></v-text-field>
    <v-list flat>
      <v-list-item-group color="indigo">
        <v-list-item @click="changeLatLng(item)" v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["items", "changeLatLng"],
  data: () => ({
    // model: 1 to #list-item-group > dont't know what it have to do
  }),
  computed: {
    ...mapGetters(["allUsers", "allPlans"])
  }
};
</script>

<style>
</style>