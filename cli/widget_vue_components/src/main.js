import Vue from 'vue'
import App from './App.vue'
// import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import bsvue from './components/bsvue'
import './assets/js/directive-resize'

Vue.use(ViewUI)
Vue.use(bsvue)
Vue.config.productionTip = false

new Vue({
  // store,
  render: h => h(App)
}).$mount('#app')
