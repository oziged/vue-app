import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PlanPage from './views/PlanPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    { 
      path: '/plan/:id', component: PlanPage
    },
    {
      path: '/plans',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/PlansPage.vue')
    }
  ]
})
