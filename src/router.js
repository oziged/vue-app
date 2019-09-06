import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PlanShow from './views/PlanShow.vue'
import PlanIndex from './views/PlanIndex.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    { 
      path: '/plan/:id', 
      component: PlanShow
    },
    {
      path: '/plans',
      component: PlanIndex
    },
  ]
})
