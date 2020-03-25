import Vue from 'vue'
import Vuex from 'vuex'
import {read, save} from '../assets/js/storage'

Vue.use(Vuex)
Vue.config.devtools = true
let modules = {
}

// 刷新页面后把保存到stroage的数据还原到store中
let state = read('state') || '{}'
state = JSON.parse(state)
for (const key in state) {
  const obj = state[key] || modules[key].state
  modules[key].state = {...obj}
}
save('state', '{}')
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: modules,
  getters: {
  },
  mutations: {
  }
})

export default store
