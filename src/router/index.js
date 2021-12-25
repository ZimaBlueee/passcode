import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const movie = r => require.ensure([], () => r(require('@/pages/movie')), 'movie');
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
			component: index, //通过component来展示索要展示的组件
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
