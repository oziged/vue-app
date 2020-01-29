import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import plan from './modules/plan'
import checkpoint from './modules/checkpoint'
import place from './modules/place'
import map from './modules/map'
import geolocation from './modules/geolocation'
import window_variables from './modules/window_variables'
import checkpoint_db from './modules/fake_db/checkpoint_db'
import place_db from './modules/fake_db/place_db'
import plan_db from './modules/fake_db/plan_db'
import { isMobile } from 'mobile-device-detect';


Vue.use(Vuex)

export default new Vuex.Store({
  actions: {

  },
  mutations: {
    setPerformanceLvl(state, payload) {
     state.perfomanceLvl = payload 
    }
  },
  state: {
    nested_colors: ['reserv', '#00572b', '#009e4e', '#00d96b', 'red'],
    perfomanceLvl: null,
    domain: 'http://localhost:3000'
  },
  getters: {
    nestedColors(state) {
      return state.nested_colors;
    },
    isMobile() {
      return isMobile;
    },
    performanceLvl(state) {
      return state.perfomanceLvl
    },
    domain(state) {
      return state.domain
    }
  },
  modules: {
    user, plan, checkpoint, place, map, geolocation, window_variables, checkpoint_db, place_db, plan_db
  }
})
