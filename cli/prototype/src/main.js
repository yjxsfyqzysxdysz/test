import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './common/iview'
import './common/element'

Vue.config.productionTip = false
Vue.prototype.$lodash = Vue.lodash = lodash
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
