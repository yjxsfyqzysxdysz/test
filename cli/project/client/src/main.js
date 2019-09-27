import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'
import iView from 'bs-iview'
import echarts from 'echarts'
import { TimePicker, DatePicker, Pagination, Input, Tree, ButtonGroup, Button, Dialog, Form, FormItem, MessageBox, checkbox } from 'element-ui'
import Notice from '../src/components/notice'
import App from './App.vue'


Vue.config.productionTip = false

Vue.prototype.$lodash = Vue.lodash = lodash
Vue.prototype.$moment = Vue.moment = moment
Vue.prototype.$http = Vue.http = axios
Vue.prototype.$echarts = Vue.echarts = echarts

Vue.use(iView)

Vue.prototype.$Notice = Vue.$Notice = Notice
Vue.$Notice.config({
  errShow: store.state.config.tipError.show,
  errDur: store.state.config.tipError.dur,
  warningShow: store.state.config.tipWarning.show,
  warningDur: store.state.config.tipWarning.dur
})
Vue.prototype.errorMsg = msg => Notice.error({ title: '错误', desc: msg })
Vue.prototype.warningMsg = msg => Notice.warning({ title: '警告', desc: msg })
Vue.prototype.successMsg = msg => Notice.success({ title: '成功', desc: msg, duration: 2 })

Vue.component('el-input', Input)
Vue.component('el-tree', Tree)
Vue.component('el-buttongroup', ButtonGroup)
Vue.component('el-button', Button)
Vue.component('el-dialog', Dialog)
Vue.component('el-form', Form)
Vue.component('el-fotmitem', FormItem)
Vue.component('el-checkbox', checkbox)
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Pagination)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')