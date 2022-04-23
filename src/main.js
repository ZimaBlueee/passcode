// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vant
import {NavBar,Icon} from 'vant'
Vue.use(NavBar)
Vue.use(Icon)
//引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// 引入axios
import axios from "axios";

Vue.prototype.axios = axios;

Vue.config.productionTip = false

let baseURL = process.env.API_ROOT
axios.defaults.baseURL = baseURL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
