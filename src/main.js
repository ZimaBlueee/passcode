// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {MessageBox, Message} from 'element-ui'

// import '../static/nes.css'
// import "../static/font/zpix.css";

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


function reFresh() {
  let parm = {
    "token": sessionStorage.getItem("token")
  }
  return axios.post("/sys/refreshToken", parm).then(res => res.data);
}

// axios拦截器，发送请求之前操作
let isRefresh = false;
axios.interceptors.request.use(config => {
  if (config.url.indexOf("/api/user/login") !== -1) {
    // 以multipart/form-data形式提交
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    // 以json形式提交
    config.headers['Content-Type'] = 'application/json'
    let current = new Date().getTime(); //当前时间
    let expireTime = sessionStorage.getItem("expireTime");//token到期时间
    let exPMin = (expireTime - current) / 1000 / 60;
    console.log(exPMin)
    // 离token到期10分钟刷新token
    if (exPMin < 10) {
      if (!isRefresh) {
        isRefresh = true;
        return reFresh().then(res => {
          if (res) {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("expireTime", res.expireTime);
            config.headers.token = sessionStorage.getItem('token')
          }
          return config;
        }).catch(res => {
          console.log(res)
        }).finally(() => {
          isRefresh = false;
        })
      }
    }
  }

  // 为请求头添加token字段
  config.headers.token = sessionStorage.getItem('token')
  return config;
})


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
    console.log(response)
    const res = response.data
    console.log(res.code);

    if (res.code && res.code !== '200') {
      if (res.code === '600') {
        sessionStorage.clear();
        window.location.href = '/login'
        return res;
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          showClose: true,
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || '服务器出错，请联系管理员'))
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


// //进入路由之前执行
// router.beforeEach((to, from, next) => {
//   //to   将要进入的路由
//   //from  将要离开的路由
//   //next   让路由继续执行
//
//   //获取当前打开的选项卡
//   store.commit('getTabs');
//   //设置当前激活的选项卡
//   store.commit('setActiveTabs', to.name);
//
//   let token = sessionStorage.getItem('token');
//   if (to.path === '/login') {
//     if (token) {
//       next({path: '/home'})
//     } else {
//       next();
//     }
//   } else {
//     if (!token && to.name !== 'login') {
//       next({path: '/login'})
//     } else {
//       if (store.state.MenuStore.menu_data.length == 0) {
//         store.commit('getMenuList', router);
//         if (to.path == "/") {
//           next({path: '/home'})
//         } else {
//           next({path: to.path});
//         }
//       } else {
//         next();
//       }
//     }
//   }
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
