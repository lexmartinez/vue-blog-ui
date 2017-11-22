<template>
  <div id="main">
    <div v-if="posts && posts.length">
    <article class="post" v-for="post in posts">
      <header>
        <div class="title">
          <h2>
            <router-link :to="`/read/${post.key}`">{{ post.title }}</router-link>
          </h2>
          <p v-if="post.author">By <strong>{{post.author.name}}</strong> &lt;&#064;{{post.author.alias}}&gt;</p>
        </div>
        <div class="meta">
          <div class="date">
            <div class=" ">{{post.publishedAt | moment("MMMM")}}</div>
            <div class="day">{{post.publishedAt | moment("DD")}}</div>
          </div>
        </div>
      </header>
      <p style="text-align: justify">{{post.abstract}}</p>
      <footer>
        <ul class="stats" style="width:100%">
          <li><i class="fa fa-tag"></i> Tags: </li>
          <li v-for="tag in post.tags"><a href="#">{{tag.name}}</a></li>
          <li v-if="post.likes"><a href="#" class="icon fa-thumbs-up fa-lg">{{post.likes}}</a></li>
        </ul>
        <ul class="actions" style="float:right !important;">
          <li> <router-link :to="`/read/${post.key}`" class="button big">Continue Reading</router-link></li>
        </ul>
      </footer>
    </article>
      <ul class="actions pagination">
        <li><a href="" class="disabled button big previous">Previous Page</a></li>
        <li><a href="#" class="button big next disabled">Next Page</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueNotifications from 'vue-notifications'

export default {
  name: 'blog-feed',
  resource: 'BlogFeed',
  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      posts: []
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
  created () {
    let url = 'https://hapi-blog.herokuapp.com/v1/articles'
    if (this.filters && this.filters.tag) {
      url = `https://hapi-blog.herokuapp.com/v1/articles?tag=${this.filters.tag}`
    }
    axios.get(url)
      .then(response => {
        this.posts = response.data
      })
      .catch(e => {
        this.showErrorMsg({message: '... we got problems fetching the articles', title: 'Uh oh!', timeout: 5000})
      })
  }
}
</script>
