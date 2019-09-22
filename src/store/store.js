import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import plan from './modules/plan'
import checkpoint from './modules/checkpoint'
import place from './modules/place'
import map from './modules/map'
import geolocation from './modules/geolocation'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {

  },
  mutations: {

  },
  state: {
    nested_colors: ['reserv', '#00572b', '#009e4e', '#00d96b', 'red']
  },
  getters: {
    nestedColors(state) {
      return state.nested_colors;
    }
  },
  modules: {
    user, plan, checkpoint, place, map, geolocation
  }
})
