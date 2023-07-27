import Vue from 'vue'
import Loading from './Loading.vue'

let seed = 1
export const instanceIds = []

const LoadingConstructor = Vue.extend(LoadingVue)

LoadingConstructor.prototype.close = () => {
  instanceIds.splice[(0, 1)]
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el)
  }
  this.$destroy(true)
}

const loading = (data = {}) => {
  if (typeof data === 'string') {
    data = { message: data }
  }
  let id = 'loading_' + seed++
  let instance = new LoadingConstructor({ data })
  instance.vm = instance.$mount()
  instance.id = id
  instance.body.appendChild(instance.vm.$el)
  instanceIds.push(instance)
  return instance
}

export const loadingClose = () => {
  instanceIds.forEach(e => {
    e.close()
  })
}

Loading.install = () => {
  Vue.prototype.$loading = Loading
}
export default Loading
