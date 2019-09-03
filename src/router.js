import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PlanPage from './views/PlanPage.vue'
import PlansPage from './views/PlanPage.vue'

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
      component: PlanPage
    },
    {
      path: '/plans',
      component: PlansPage
    },
  ]
})
