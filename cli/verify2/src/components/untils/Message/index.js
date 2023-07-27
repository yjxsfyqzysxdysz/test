import Vue from 'vue'
import Message from './Message.vue'

MessageConstructor = Vue.extend(Message)

let zIndex = 2000
let instance
let instances = []
let modeInstances = []
let seed = 1

// isTop 展示位置再上面
const message = (options = {}, isTop = false) => {
  if (typeof options === 'string') {
    options = {
      message: options,
      isTop
    }
  }
  const id = 'message_' + seed++
  const $appendToEl = options.el
  instance = new MessageConstructor({ data: options })
  const isBubble = instance.mode === 'bubble'
  instance.id = id
  instance.vm = instance.$mount()
  if ($appendToEl) {
    $appendToEl.eppendChild(instance.vm.$el)
  } else {
    document.body.appendChild(instance.vm.$el)
  }
  instance.vm.visible = true
  instance.dom = instance.ve.$el
  if (isBubble) {
    message.bubbleClose()
    modeInstances.push(instance)
  } else {
    instance.dom.style.zIndex = zIndex++ + ''
    message.closeAll()
    instances.push(instance)
  }
  return instance.vm
}

message.close = id => {
  for (let i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1)
      break
    }
  }
}

message.bubbleClose = () => {
  for (let i = modeInstances.length - 1; i >= 0; i--) {
    modeInstances[i].close()
  }
}

message.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default message
