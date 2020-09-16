/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Observer
// 观察者
function Observer(data) {
  this.data = data
  this.walk(data) // 初始化
}

// 劫持 监听所有属性
// 通过 defineProperty 劫持 vm 实例对象属性的读/写权
Observer.prototype = {
  constructor: Observer,
  /**
   * 初始化
   * 遍历每个属性
   */
  walk: function (data) {
    let that = this
    Object.keys(data).forEach(key => {
      that.convert(key, data[key])
    })
  },
  /**
   * 转换
   * 使用 defineReactive 进行 defineProperty
   */
  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },
  defineReactive: function (data, key, val) {
    const dep = new Dep()
    let childObj = observe(val)
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 可配置
      get: function () {
        // 由于需要在闭包内添加 watcher ，所以通过Dep定义一个全局 target 属性，暂存 watcher，添加完后移除
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set: function (newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        childObj = observe(newVal) // 更新观察者
        dep.notify() // 通知 发布者 变化
      },
    })
  },
}
// 若传入为 Object 则返回 观察者 实例
function observe(val) {
  if (!val || Object.prototype.toString.call(val) !== '[object Object]') return
  return new Observer(val)
}

let uid = 0 // 唯一id

// 发布者
function Dep() {
  this.id = uid++
  this.subs = []
}

Dep.prototype = {
  // 通知 发布者 添加 订阅者
  addSub: function (val) {
    this.subs.push(val)
  },
  // 通知 订阅者 变化
  depend: function () {
    Dep.target.addDep(this)
  },
  // 通知 发布者 移除 订阅者
  removeSub: function (val) {
    const index = this.subs.indexOf(val)
    if (index !== -1) {
      this.subs.splice(index, 1)
    }
  },
  // 发布者 触发 update
  notify: function () {
    this.subs.forEach(e => {
      e.update() // 通知 订阅者 变化
    })
  },
}

Dep.target = null

// ------------------------------------------------------
// Compile
// 指令解析器
/**
 * @param {*} el dom节点
 * @param {*} vm this
 */
function Compile(el, vm) {
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)  // 查找dom

  /**
   * 有节点
   * 创建虚拟DOM
   * 初始化-指令解析
   * 页面渲染
   */
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  constructor: Compile,
  // 创建虚拟 节点
  node2Fragment: function (el) {
    let fragment = document.createDocumentFragment()
    let child

    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child)
    }
    return fragment
  },
  // 初始化
  init: function () {
    this.compileElement(this.$fragment)
  },
  // element {{}} 指令解析
  compileElement: function (el) {
    let childNodes = el.childNodes
    const that = this
    const reg = /\{\{(.*)\}\}/
    Array.prototype.slice.call(childNodes).forEach(node => {
      const text = node.textContent
      if (that.isElementNode(node)) {
        that.compile(node)
      } else if (that.isTextNode(node) && reg.test(text)) {
        that.compileText(node, RegExp.$1.trim())
      }
      // 递归
      if (node.childNodes && node.childNodes.length) {
        that.compileElement(node)
      }
    })
  },
  // 解析指令
  compile: function (node) {
    let nodeAttrs = node.attributes
    const that = this
    Array.prototype.slice.call(nodeAttrs).forEach(attr => { // 类数组 -》 转数组
      let attrName = attr.name
      if (that.isDirective(attrName)) {
        const exp = attr.value
        const dir = attrName.substring(2)
        // 事件指令
        if (that.isEventDirective(dir)) {
          compileUtil.eventHandler(node, that.$vm, exp, dir)
        } else {
          // 其他指令 属性
          compileUtil[dir] && compileUtil[dir](node, that.$vm, exp)
        }
        node.removeAttribute(attrName)
      }
    })
  },
  // 是文本
  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp)
  },
  // 是v-指令
  isDirective: function (attr) {
    return attr.indexOf('v-') === 0
  },
  // 是事件指令
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },
  // 如果节点是元素节点，则 nodeType 属性将返回 1。
  isElementNode: function (node) {
    return node.nodeType === 1
  },
  // 如果节点是元素或属性中的文本内容节点，则 nodeType 属性将返回 3。
  isTextNode: function (node) {
    return node.nodeType === 3
  },
}

// 指令集
/**
 * 转发给 bind 指向当前节点
 */
const compileUtil = {
  /**
   * @param {*} node 节点
   * @param {*} vm this
   * @param {*} exp 参数
   */
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  },
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class')
  },
  // 监听当前节点 input 标签
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model')
    const that = this
    let val = this._getVMVal(vm, exp)
    node.addEventListener('input', function (e) {
      const newVal = e.target.value
      if (val === newVal) return
      that._setVMVal(vm, exp, newVal)
      val = newVal
    })
  },
  // 绑定 修改操作 触发监听
  bind: function (node, vm, exp, dir) {
    const updaterFn = updater[dir + 'Updater']
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))
    new Watcher(vm, exp, function (val, oldVal) {
      updaterFn && updaterFn(node, val, oldVal)
    })
  },
  // 事件处理 添加事件监听
  eventHandler: function (node, vm, exp, dir) {
    const eventType = dir.split(':')[1]
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },
  // 获取 最底层 节点 参数
  _getVMVal: function (vm, exp) {
    let val = vm
    exp = exp.split('.')
    exp.forEach(e => {
      val = val[e]
    })
    return val
  },
  // 更新 最底层 节点 参数
  _setVMVal: function (vm, exp, value) {
    let val = vm
    exp = exp.split('.')
    exp.forEach((e, i) => { // 循环找到最底层 节点，更新参数
      // 非最后一个key，更新val的值
      if (i === exp.length - 1) {
        val[e] = value
      } else {
        val = val[e]
      }
    })
  },
}

// 视图更新
const updater = {
  // 修改文本内容
  textUpdater: function (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  },
  // 修改元素内容
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value
  },
  // 修改class属性名
  classUpdater: function (node, value, oldValue) {
    let className = node.className
    className = className.replace(oldValue, '').replace(/\s$/, '')
    let space = className && String(value) ? '' : ''
    node.className = className + space + value
  },
  // 修改模块
  modelUpdater: function (node, value) {
    node.value = typeof value === 'undefined' ? '' : value
  },
}

// ------------------------------------------------------
// Watcher
// 订阅者
/**
 * @param {*} vm this
 * @param {*} expOrFn data 的属性 || 方法
 * @param {*} cb callback
 */
function Watcher(vm, expOrFn, cb) {
  this.cb = cb
  this.vm = vm
  this.expOrFn = expOrFn
  this.depIds = {} // 发布者 的 唯一 id

  if (typeof expOrFn === 'function') { // 从解析指令触发
    this.getter = expOrFn // compileUtil
  } else { // 从观察者触发
    this.getter = this.parseGetter(expOrFn.trim()) // 获得该 属性 所对应的参数
  }
  this.value = this.get()
}

Watcher.prototype = {
  constructor: Watcher,
  update: function () {
    this.run()
  },
  // 数据改变时，触发 回调
  run: function () {
    let value = this.get()
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  },
  // 添加 订阅者
  addDep: function (dep) {
    /**
     * 1. 每次调用run()的时候会触发相应属性的getter
     * getter里面会触发dep.depend()，继而触发这里的addDep
     * 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
     * 则不需要将当前watcher添加到该属性的dep里
     * 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
     * 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
     * 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
     * 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
     * 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
     * 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
     * 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
     * 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
     * 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
     * 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
     */
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  },
  get: function () {
    Dep.target = this
    let value = this.getter.call(this.vm, this.vm) // 触发属性的getter， 从而添加订阅者
    Dep.target = null
    return value
  },
  // 语法分析 获得 data 中，进行数据绑定的 属性 及各子属性
  parseGetter: function (exp) {
    if (/[^\w.$]/.test(exp)) return
    let exps = exp.split('.')
    return function (obj) {
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) return
        obj = obj[exps[i]]
      }
      return obj
    }
  },
}

// ------------------------------------------------------
// MVVM

function MVVM(options) {
  this.$options = options || {}
  let data = (this._data = this.$options.data)
  const that = this
  // 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(key => {
    that._proxyData(key)
  })
  this._initComputed() // 初始化 计算属性
  observe(data, this) // 观察者
  this.$compile = new Compile(options.el || document.body, this) // 初始化 指令解析器
}

MVVM.prototype = {
  constructor: MVVM,
  // 数据监听
  $watch: function (key, cb) {
    new Watcher(this, key, cb)
  },
  /**
   * 属性代理方法
   * 使 vm._data.name ---> vm.name
   */
  _proxyData: function (key, setter, getter) {
    const that = this
    setter = setter || undefined
    Object.defineProperty(that, key, {
      configurable: false, // 可配置
      enumerable: true, // 可枚举
      get: function proxyGetter() {
        return that._data[key]
      },
      set: function proxySetter(newVal) {
        that._data[key] = newVal
      },
    })
  },
  /**
   * 初始化 计算属性
   */
  _initComputed: function () {
    const that = this
    let computed = this.$options.computed
    if (typeof computed === 'object') {
      Object.keys(computed).forEach(key => {
        Object.defineProperty(that, key, {
          get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
          set: function () {},
        })
      })
    }
  },
}
