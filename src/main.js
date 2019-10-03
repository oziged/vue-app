import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import VueCollapse from 'vue2-collapse'
import * as VueGoogleMaps from 'vue2-google-maps'
import {VueMasonryPlugin} from 'vue-masonry';
import MagicGrid from 'vue-magic-grid'
import vClickOutside from 'v-click-outside'
import Notifications from 'vue-notification'
// import VueNestable from '../vue-nestable'
import VueNestable from 'vue-nestable'
import VueTour from 'vue-tour'
import vuescroll from 'vuescroll';


require('vue-tour/dist/vue-tour.css')

Vue.use(vuescroll);
Vue.use(VueTour)
Vue.use(VueNestable)
Vue.use(Notifications)
Vue.use(vClickOutside)
Vue.use(MagicGrid)
Vue.use(VueMasonryPlugin)
Vue.use(Vuetify);
Vue.use(VueCollapse);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBdegr1g9klfKJcrFWJzjAVZvGvCNM0lLE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
Vue.config.productionTip = false

Vue.filter('truncate', function (value, count) {
  return `${value.split(' ').slice(0, count).join(' ')}...`
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')



