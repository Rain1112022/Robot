import { createApp } from 'vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import * as ElIcon from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import store from './store'
import '@/assets/style/popcss.css'
import './permission'
import './socket'


const app = createApp(App)
for (const [name, component] of Object.entries(ElIcon)) {
  app.component(name, component);
}
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
