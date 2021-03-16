import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})
