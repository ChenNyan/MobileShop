import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import {VueJsonp}  from  'vue-jsonp'
import './assets/base.css'
import './utils/filter.js'

Vue.use(VueJsonp)
Vue.use(Vant);
Vue.config.productionTip = false
store.dispatch('getUserInfo')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
