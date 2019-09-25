import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PlanShow from './views/PlanShow.vue'
import PlanIndex from './views/PlanIndex.vue'
import UserShow from './views/UserShow'
import AboutPage from './views/AboutPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    { 
      path: '/plan/:id', 
      component: PlanShow
    },
    {
      path: '/plans',
      component: PlanIndex
    },
    { 
      path: '/user/:id', 
      component: UserShow
    },
    { 
      path: '/about', 
      component: AboutPage
    },
  ]
})
