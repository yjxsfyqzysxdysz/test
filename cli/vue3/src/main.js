import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HelloWorld from '@/components/HelloWorld.vue'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.component('HelloWorld', HelloWorld)
app.config.errorHandler = err => {
  /* 处理错误 */
  console.log(err)
}
