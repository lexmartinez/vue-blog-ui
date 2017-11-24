import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'
import BlogAdmin from '../components/BlogAdmin.vue'
import BlogLogin from '../components/BlogLogin.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'feed',
    component: Blog
  }, {
  //
  //   path: '/tag/:tag',
  //   name: 'tag',
  //   props: true,
  //   component: Blog
  // },
  //  {
    path: '/read/:post',
    name: 'post',
    props: true,
    component: Blog
  }, {
    path: '/admin',
    name: 'admin',
    component: BlogAdmin
  }, {
    path: '/admin/login',
    name: 'login',
    component: BlogLogin
  }, {
    path: '/admin/callback',
    name: 'callback',
    component: BlogAdmin
  }]
})

router.beforeEach((to, from, next) => {
  if (to && to.name === 'admin') {
    // here is the auth section :3
    if (Vue.localStorage.get('auth.token')) {
      next()
    } else {
      next('/admin/login')
    }
  } else if (to && to.name === 'callback') {
    console.log(to)
    Vue.localStorage.set('auth.token', '123345')
  } else {
    next()
  }
})

export default router
