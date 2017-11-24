import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'

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
    component: Blog
  }]
})

router.beforeEach((to, from, next) => {
  if (to && to.name === 'admin') {
    // here is the auth section :3
    if (Vue.localStorage.get('auth.token')) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
