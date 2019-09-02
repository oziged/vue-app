<template>
  <div>
    <badger-accordion>
    <badger-accordion-item>
        <template slot="header">First Accordion Header</template>    
        <template slot="content">First Accordion Content</template>  
    </badger-accordion-item>
 
    <badger-accordion-item>
        <template slot="header">Second Accordion Header</template>    
        <template slot="content">Second Accordion Content</template>  
    </badger-accordion-item>
</badger-accordion>
    <div class="plan">
      <div class="plan_info">
        <h1 class="plan_title">{{ title }}</h1>
        <p class="plan_description">{{ description }}</p>
        <div class="checkpoints_list">
          <div class="checkpoint_item" 
            @click="openCheckpoint(checkpoint.id, 'Checkpoint')" 
            v-for="(checkpoint, index) in getSubCheckpoints(id, 'Plan')" 
            :key="index">

          </div>
        </div>
      </div>
      <app-map class="plan_map"/>
    </div>
  </div>
</template>

<script>
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
import { mapGetters, mapActions } from "vuex";
import AppMap from './AppMap'

export default {
  props: ['id'],
  components: {
    AppMap,
    BadgerAccordion,
    BadgerAccordionItem,
  },
  data: () => ({
    title: '',
    description: ''
  }),
  methods: {
    ...mapActions(["updateMapPlaces"]),
    openCheckpoint(id) {
      let checkpoint = this.getCheckpoint(id);
      let subCheckpoints = this.getSubCheckpoints(id, 'Checkpoint');
      if (subCheckpoints) {
        this.updateMapPlaces(subCheckpoints);
      }
      else this.updateMapPlaces(checkpoint);
    },
  },
  mounted() {
    let plan = this.getPlan(this.id);
    this.title = plan.title;
    this.description = plan.description;

    this.$gmapApiPromiseLazy().then(() => {
    let subCheckpoints = this.getSubCheckpoints(this.id, 'Plan');
    if (subCheckpoints) {
        this.updateMapPlaces(subCheckpoints);
      }
    })

  },
  computed: {
    ...mapGetters(["allUsers", "allPlans", "allPlaces", "allCheckpoints", "getPlace", "getCheckpoint", "getSubCheckpoints", "getPlan"])
  }
}

</script>

<style lang="scss" scoped>
  .plan {
    margin: 10px 20px;
    display: flex;
    .plan_info {
      width: 50%;
      margin-right: 10px;
      .plan_title, .plan_description {
        padding: 10px;
        margin-bottom: 10px;
        background-color: #fff;
      }
    }
    .plan_map {
      // margin: 10px 20px 0 0;
      width: 50%;
      height: 600px;
    }
  }

</style>