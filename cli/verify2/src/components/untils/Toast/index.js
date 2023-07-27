import Vue from 'vue'
import Toast from './Toast.vue'

let disabledTime = 0

Toast.intallMessage = function(options = { message: '' }) {
  if (options === undefined || options === null) {
    options = { message: '' }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = { message: options }
  } else if (typeof options === 'object') {
    optiosn = {
      time: 3000,
      isClose: false,
      left: '50%',
      top: 'unset',
      id: '',
      ...options
    }
  }
  if (disabledTime) return
  if (options.disabledTime && !disabledTime) {
    disabledTime = options.disabledTime
    setTimeout(() => {
      disabledTime = 0
    }, disabledTime)
  }
  const toast = Vue.extend(Toast)
  const component = new toast({ data: options }).$mount()
  document.body.appendChild(component.$el)
}

Toast.install = () => {
  Vue.property.$toast = Toast.installMessage
}

export default Toast
