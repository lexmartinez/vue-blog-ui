<template>
  <main class="blog" id="app">
    <blog-nav/>
    <transition name="fade">
        <article class="post login-box">
          <header>
            <div class="title">
              <h2>
                Authors Login
              </h2>
              <p>
                Restricted area - please fill your account data
              </p>
            </div>
            <div class="meta"></div>
          </header>
          <p style="text-align: justify; margin-top: -10px">USERNAME: <input type="text" v-model="username" @keyup.enter="login"></p>
          <p style="text-align: justify; margin-top: -20px">PASSWORD: <input type="password" v-model="password" @keyup.enter="login"></p>
          <footer>
            <ul class="stats" style="width:100%"></ul>
            <ul class="actions" style="float:right !important;">
              <li style="cursor:pointer"> <a class="button big" @click="login">LOGIN</a></li>
            </ul>
          </footer>
        </article>
    </transition>
    <div class="login-footer">
      <section style="text-align: center;">
        <section id="footer">
          <p class="copyright">Copyright &copy; 2017 Arlex D. Mart&iacute;nez</p>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
import BlogNav from './BlogNav'
import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import VueNotifications from 'vue-notifications'

export default {
  name: 'blog-login',
  resource: 'BlogLogin',
  components: {BlogNav},
  data () {
    return {
      isLoging: false,
      username: '',
      password: ''
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success
    },
    showInfoMsg: {
      type: VueNotifications.types.info
    },
    showWarnMsg: {
      type: VueNotifications.types.warn
    },
    showErrorMsg: {
      type: VueNotifications.types.error
    }
  },
  methods: {
    login () {
      if (this.username !== '' && this.password !== '') {
        this.toLogin()
      }
    },
    toLogin () {
      this.$Progress.start()
      axios.post('https://hapi-blog.herokuapp.com/v1/auth', {username: this.username, password: this.password})
        .then(response => {
          Vue.localStorage.set('auth.token', response.data.token)
          this.$Progress.finish()
          router.replace('/admin')
        })
        .catch(e => {
          Vue.localStorage.remove('auth.token')
          console.log(e)
          this.showErrorMsg({message: '... Could not login, please check your credentials', title: 'Uh oh!', timeout: 5000})
          this.$Progress.fail()
        })
    }
  }
}
</script>
