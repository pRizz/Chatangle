// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Adapted from https://github.com/lsquires/open-iota

import Vue from 'vue'
import App from './App'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import './style/common.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(VueClipboard)
Vue.use(Buefy)
Vue.use(AsyncComputed)
Vue.use(require('vue-moment'))
Vue.use(VueAxios, axios)
Vue.use(require('vue-truncate-filter'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
