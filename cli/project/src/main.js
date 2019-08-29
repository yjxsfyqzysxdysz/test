import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
import axios from 'axios'


Vue.config.productionTip = false

Vue.prototype.$lodash = Vue.lodash = lodash
Vue.prototype.$moment = Vue.moment = moment
Vue.prototype.$http = Vue.http = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')