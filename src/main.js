import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueClickAway from 'vue3-click-away'

createApp(App).use(store).use(router).use(VueClickAway).mount('#app')
