import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PlanShow from './views/PlanShow.vue'
import PlanIndex from './views/PlanIndex.vue'
import UserShow from './views/UserShow'
import AuthPage from './views/AuthPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "/projects/vue-app/",
  routes: [
    {
      path: '/',
      component: HomePage
    },
    { 
      path: '/plans/:id', 
      component: PlanShow
    },
    {
      path: '/plans',
      component: PlanIndex
    },
    { 
      path: '/users/:id', 
      component: UserShow
    },
    {
      path: '/auth/',
      component: AuthPage
    }
  ],
})
