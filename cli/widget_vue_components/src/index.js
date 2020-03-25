import PreviewPlugin from "./components/previewPlugin.vue"
import ViewUI from 'view-design'
import bsvue from './components/bsvue'
import 'view-design/dist/styles/iview.css'
import "./assets/fonts/iconfont.css"

const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(ViewUI)
  Vue.use(bsvue)
  Vue.component('previewplugin', PreviewPlugin)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
