import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const movie = r => require.ensure([], () => r(require('@/pages/movie')), 'movie');
const calculator = r => require.ensure([], () => r(require('@/pages/calculator')), 'calculator');
const read = r => require.ensure([], () => r(require('@/pages/read')), 'read');
const scanCodePage = r => require.ensure([], () => r(require('@/pages/scanCodePage')), 'scanCodePage');
const scanQRCode = r => require.ensure([], () => r(require('@/pages/scanQRCode')), 'scanQRCode');
const applyMealTicket = r => require.ensure([], () => r(require('@/pages/applyMealTicket')), 'applyMealTicket');
const readMealTicket = r => require.ensure([], () => r(require('@/pages/readMealTicket')), 'readMealTicket');
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test');

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      component: index, //通过component来展示所要展示的组件
      name: "index",
      hidden: true,
      redirect: '/home',
      children: [{
        path: '/home',
        component: home,
        name: '首页',
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
          path: '/scanCodePage',
          name: '扫码页面',
          component: scanCodePage,
          hidden: true
        },
        {
          path: '/scanQRCode',
          name: '扫一扫',
          component: scanQRCode,
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
          name: '扫描组件',
          component: readMealTicket,
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
