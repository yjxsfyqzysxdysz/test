import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
import echarts from 'echarts'
import leaflet from 'leaflet' // 地图框架
import 'leaflet/dist/leaflet.css'
import 'moment/locale/zh-cn'
import './common/iview'
import './common/element'

Vue.config.productionTip = false
Vue.prototype.$lodash = Vue.lodash = lodash
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.prototype.$leaflet = leaflet

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
