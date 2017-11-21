<template>
  <transition name="post">
    <article class="post" v-if="post && article">
      <header>
        <div class="title">
          <h2>{{ article.title }}</h2>
          <p v-if="article.author">By <strong>{{article.author.name}}</strong> &lt;&#064;{{article.author.alias}}&gt;</p>
        </div>
        <div class="meta">
          <div class="date">
            <div class=" ">{{article.publishedAt | moment("MMMM")}}</div>
            <div class="day">{{article.publishedAt | moment("DD")}}</div>
          </div>
        </div>
      </header>
      <footer style="width:100%; height: 20px">
        <ul class="stats">
          <li>Tags: </li>
          <li v-for="tag in article.tags"><a href="#">{{tag.name}}</a></li>
        </ul>
      </footer>
      <p style="text-align: justify">{{article.abstract}}</p>
      <p><vue-markdown :source="article.content"></vue-markdown></p>
      <footer>

      </footer>
    </article>
  </transition>
</template>

<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: {VueMarkdown},
  props: { post: String },

  data () {
    return {
      article: {},
      commentsReady: false
    }
  },

  watch: {
    post (to, from) {
      if (to === from || !this.post) return

      this.commentsReady = false
    }
  },

  methods: {
    showComments () {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    }
  },

  beforeMount () {
    if (this.post) {
      axios.get('https://hapi-blog.herokuapp.com/v1/articles?key=' + this.post)
        .then(response => {
          this.article = response.data
          this.showComments()
        })
        .catch(e => {
          this.showErrorMsg({message: '... we got problems fetching the articles', title: 'Uh oh!', timeout: 5000})
        })
    }
  }
}
</script>