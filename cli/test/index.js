import CheckBox from './src/components/CheckBox.vue' // 导入组件

const install = function(Vue, config = {}) {
    if (install.installed) return;
    Vue.component(CheckBox.name, CheckBox)
  };
  
  // auto install
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  };
  module.exports = {
    install,
    CheckBox
  };
  
