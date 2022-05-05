// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {MessageBox, Message} from 'element-ui'

import '../node_modules/nes.css/css/nes.min.css'
import "../static/font/zpix.css";


// 引入vant
import {NavBar, Icon} from 'vant'

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


// response interceptor
axios.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(response)
    const res = response.data
    // console.log(res.code);

    if (res.code && res.code !== '200') {
      if (res.code === '1007') {
        // MessageBox.confirm('超时，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   removeToken()
        //   resetRouter()
        //   location.reload() // 为了重新实例化vue-router对象 避免bug
        // })
      } else if (res.code === '1004') {
        // logout().then(() => {
        //   location.reload() // 为了重新实例化vue-router对象 避免bug
        // })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          showClose: true,
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || '服务器出错，请联系管理员'))
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '请求出错，请联系管理员!',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
