<template>
  <modal-window :value="value" @input="$emit('input')">
           <v-btn class="close_button" @click="$emit('input')" color="error">Close Map</v-btn>
    <app-map :displayedItemId="mobileMapModalItemId" :displayedItemType="mobileMapModalItemType" style="width: 100%; height: 100%"/>
  </modal-window>
</template>

<script>
import ModalWindow from "./ModalWindow";
import AppMap from "./AppMap";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["value"],
  components: {
    ModalWindow,
    AppMap
  },
  methods: {
    ...mapActions(["setMobileMapModalItemId", "setMobileMapModalItemType"])
  },
  computed: {
    ...mapGetters(["mobileMapModalItemId", "mobileMapModalItemType"])
  }
};
</script>

<style lang="scss" scoped>
    .close_button {
        position: absolute;
        z-index: 5;
        left: 50%;
        bottom: 15px;
        transform: translateX(-50%);
    }
</style>