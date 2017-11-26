<template>
  <transition name="fade">
    <main class="blog" id="app">
      <div>
        <!-- Header -->
        <header id="header" class="admin-header">
          <h1><router-link :to="'/admin'"><img src="/static/favicon.png" style="height:20px; vertical-align: middle; margin-top:-5px"> Lex Mart&iacute;nez</router-link>
          </h1>
          <nav class="links">
            <ul>
              <li><a style="cursor: pointer" @click="current = 'tags'" v-bind:class="{ active: current==='tags' }"><i class="fa fa-tags fa-lg"></i> Tags</a></li>
              <li><a style="cursor: pointer" @click="current = 'authors'" v-bind:class="{ active: current==='authors' }"><i class="fa fa-coffee fa-lg"></i> Authors</a></li>
              <li><a style="cursor: pointer"  @click="current = 'articles'" v-bind:class="{ active: current==='articles' }"><i class="fa fa-newspaper-o fa-lg"></i> Articles</a></li>
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
      <blog-tags v-if="current === 'tags'"></blog-tags>
      <blog-authors v-if="current === 'authors'"></blog-authors>
      <blog-articles v-if="current === 'articles'"></blog-articles>
    </main>
  </transition>
</template>

<script>
import Vue from 'vue'
import router from '../../router/index'
import axios from 'axios'
import BlogTags from './BlogTags'
import BlogAuthors from './BlogAuthors'
import BlogArticles from './BlogArticles'

export default {
  name: 'blog-admin',
  resource: 'BlogAdmin',
  components: {BlogTags, BlogAuthors, BlogArticles},
  data () {
    return {
      current: 'articles'
    }
  },
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
