import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false

// import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
