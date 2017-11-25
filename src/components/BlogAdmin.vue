<template>
  <transition name="fade">
    <main class="blog" id="app">
      <div>
        <!-- Header -->
        <header id="header">
          <h1><router-link :to="'/admin'"><img src="/static/favicon.png" style="height:20px; vertical-align: middle; margin-top:-5px"> Lex Mart&iacute;nez</router-link>
          </h1>
          <nav class="links">
            <ul>
              <li><a href="#"><i class="fa fa-tags fa-lg"></i> Tags</a></li>
              <li><a href="#"><i class="fa fa-coffee fa-lg"></i> Authors</a></li>
              <li><a href="#"><i class="fa fa-newspaper-o fa-lg"></i> Articles</a></li>
              <li><a href="#"><i class="fa fa-comments fa-lg"></i> Comments</a></li>
              <li></li>
            </ul>
          </nav>
          <nav class="main">
            <ul>
              <li style="cursor:pointer">
                <a class="fa-power-off" @click="logout">Logout</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <article class="post">
        <header>
          <div class="title">
            <h2>
              TEST CONTENT
            </h2>
            <p>
              TEST CONTENT TEST CONTENT
            </p>
          </div>
          <div class="meta"></div>
        </header>

      </article>
      <div class="login-footer">
        <section style="text-align: center;">
          <section id="footer">
            <p class="copyright">Copyright &copy; 2017 Arlex D. Mart&iacute;nez</p>
          </section>
        </section>
      </div>
    </main>
  </transition>
</template>

<script>
import Vue from 'vue'
import router from '../router'
import axios from 'axios'

export default {
  name: 'blog-admin',
  resource: 'BlogAdmin',
  methods: {
    logout () {
      this.$Progress.start()
      axios.delete(`https://hapi-blog.herokuapp.com/v1/auth/${Vue.localStorage.get('auth.token')}`)
        .then(response => {
          Vue.localStorage.remove('auth.token')
          this.$Progress.finish()
          router.go('/admin/login')
        })
        .catch(e => {
          Vue.localStorage.remove('auth.token')
          router.go('/admin/login')
          this.$Progress.fail()
        })
    }
  }
}
</script>
