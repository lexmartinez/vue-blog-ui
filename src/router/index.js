import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'
import BlogAdmin from '../components/admin/BlogAdmin.vue'
import BlogLogin from '../components/BlogLogin.vue'
import Blog404 from '../components/Blog404.vue'
import axios from 'axios'
import service from '@/services/AuthService'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/blog',
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
      path: '*',
      name: 'notfound',
      component: Blog404
    }]
})

router.beforeEach((to, from, next) => {
  if (to && to.name === 'admin') {
    if (Vue.localStorage.get('auth.token')) {
      service.validate(Vue.localStorage.get('auth.token'))
        .then(response => {
          axios.defaults.headers.common['x-auth-token'] = Vue.localStorage.get('auth.token')
          next()
        })
        .catch(e => {
          Vue.localStorage.remove('auth.token')
          next('/admin/login')
        })
    } else {
      next('/admin/login')
    }
  } else if (to && to.name === 'login') {
    if (Vue.localStorage.get('auth.token')) {
      service.validate(Vue.localStorage.get('auth.token'))
        .then(response => next('/admin'))
        .catch(e => {
          Vue.localStorage.remove('auth.token')
          next()
        })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
