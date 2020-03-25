import bsCover from './components/cover.vue'
import 'font-awesome/css/font-awesome.min.css'

const components = {
  bsCover
}

const directives = {
}

const bsvue = {
  install(Vue) {
    Object.keys(components).forEach(item => Vue.component(components[item].name, components[item]))
    Object.keys(directives).forEach(item => Vue.directive(directives[item].name, directives[item]))
  },
  ...components,
  ...directives
}

export default bsvue
