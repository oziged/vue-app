import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import plan from './modules/plan'
import checkpoint from './modules/checkpoint'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, plan, checkpoint
  }
})
