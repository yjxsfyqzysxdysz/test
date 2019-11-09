import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'bs-iview'

Vue.config.productionTip = false
Vue.prototype.$http = Vue.http = axios


Vue.use(iView)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
