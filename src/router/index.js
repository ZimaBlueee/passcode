import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const applyCanteenVisitor = r => require.ensure([], () => r(require('@/pages/applyCanteenVisitor2')), 'applyCanteenVisitor');
const readVisitorQRCode = r => require.ensure([], () => r(require('@/pages/readVisitorQRCode')), 'readVisitorQRCode');
const movie = r => require.ensure([], () => r(require('@/pages/movie')), 'movie');
const calculator = r => require.ensure([], () => r(require('@/pages/calculator')), 'calculator');
const read = r => require.ensure([], () => r(require('@/pages/read')), 'read');
const applyMealTicket = r => require.ensure([], () => r(require('@/pages/applyMealTicket')), 'applyMealTicket');
const readMealTicket = r => require.ensure([], () => r(require('@/pages/readMealTicket')), 'readMealTicket');
const mealReport = r => require.ensure([], () => r(require('@/pages/mealReport')), 'mealReport');
const login = r => require.ensure([], () => r(require('@/pages/Login')), 'login');
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test');

export default new Router({
  routes: [
    // {
    //   path: '/HelloWorld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      component: login,
      name: '登录',
      hidden: true
    },
    {
      path: '/index',
      component: index, //通过component来展示所要展示的组件
      name: "index",
      hidden: true,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home,
          name: '首页',
          hidden: true
        },
        {
          path: '/applyCanteenVisitor',
          component: applyCanteenVisitor,
          name: '申请食堂通行证',
          hidden: true
        },
        {
          path: '/readVisitorQRCode',
          component: readVisitorQRCode,
          name: '扫描食堂通行证',
          hidden: true
        },
        {
          path: '/movie',
          component: movie,
          name: '电影',
          hidden: true
        },
        {
          path: '/calculator',
          component: calculator,
          name: '身高计算器',
          hidden: true
        },
        {
          path: '/read',
          component: read,
          name: '文档阅读',
          hidden: true
        },
        {
          path: '/applyMealTicket',
          name: '申请饭票',
          component: applyMealTicket,
          hidden: true
        },
        {
          path: '/readMealTicket',
          name: '扫一扫',
          component: readMealTicket,
          hidden: true
        },
        {
          path: '/mealReport',
          name: '就餐报告',
          component: mealReport,
          hidden: true
        },
        {
          path: '/test',
          component: test,
          name: '测试',
          hidden: true
        }
      ]
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
