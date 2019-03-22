import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import './assets/stylus/reset.styl'

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
