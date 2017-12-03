<template>
  <div id="main">
    <div v-if="posts && posts.length">
      <article class="post" v-for="post in posts">
        <header>
          <div class="title">
            <h2>
              <router-link :to="`/read/${post.key}`">{{ post.title }}</router-link>
            </h2>
            <p v-if="post.author">
              <popper trigger="click" :options="{placement: 'bottom'}">
                <div class="popper">
                  <figure class="fir-image-figure author-popover">
                    <img class="fir-author-image fir-clickcircle" :src="post.author.avatar" :alt="post.author.name">
                    <figcaption>
                      <div class="fig-author-figure-title"><strong>{{post.author.name}}</strong></div>
                      <div class="fig-author-figure-title">{{post.author.bio}}</div>
                      <div class="fig-author-figure-title" style="text-align: right;" v-if="post.author.github && post.author.twitter">
                        <a :href="post.author.twitter" v-if="post.author.twitter"><i class="fa fa-twitter fa-2x"></i></a>
                        <a :href="post.author.github" v-if="post.author.github"><i class="fa fa-github fa-2x"></i></a>
                      </div>
                    </figcaption>
                  </figure>
                </div>
                <span slot="reference" style="cursor: pointer">
                By <strong>{{post.author.name}}</strong> &lt;&#064;{{post.author.alias}}&gt;
              </span>
              </popper>

              <span class="sharebox">
            <social-sharing :url="post.shortUrl" :title="post.title + ' <@' + post.author.alias + '>'" inline-template>
              <div>
                Share :
                <network network="facebook">
                  <span class="button big"><i class="fa fa-lg fa-facebook"></i></span>
                </network>
                <network network="twitter">
                  <span class="button big"><i class="fa fa-lg fa-twitter"></i></span>
                </network>
              </div>
            </social-sharing>
            </span>
            </p>
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
            <li v-if="post.tags.length"><i class="fa fa-tag"></i> Tags: </li>
            <li v-for="tag in post.tags"><a href="#">{{tag.name}}</a></li>
            <li v-if="post.likes"><a href="#" class="icon fa-thumbs-up fa-lg">{{post.likes}}</a></li>
          </ul>
          <ul class="actions" style="float:right !important;">
            <li> <router-link :to="`/read/${post.key}`" class="button big">Continue Reading</router-link></li>
          </ul>
        </footer>
      </article>
    </div>
    <div v-if="!(posts || []).length">
      <article v-if="loading" style="width: 100%; height: 300px; vertical-align: middle; text-align: center">
        <i class="fa fa-cog fa-spin fa-4x fa-fw" style="color:#ababab; font-weight: 200"></i>
      </article>
      <article class="post" v-if="!loading">
        <header>
          <div class="title">
            <h2>
              Sorry!
            </h2>
            <p>
              NO ARTICLES FOUND
            </p>
          </div>
          <div class="meta"></div>
        </header>
        <h2 style="padding-top:20px">Opps, No results found!</h2>
        <p>Your search did not match any article. Try searching for something else.</p>
        <footer>
          <ul class="stats" style="width:100%"></ul>
          <ul class="actions" style="float:right !important; margin-right: 10px">
            <li><i class="fa fa-search fa-5x"></i> </li>
          </ul>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import VueNotifications from 'vue-notifications'
  import Popper from 'vue-popperjs'
  import 'vue-popperjs/dist/css/vue-popper.css'

  export default {
    name: 'blog-feed',
    resource: 'BlogFeed',
    props: {
      filters: {
        type: Object,
        default: () => {}
      }
    },
    components: {popper: Popper},
    data () {
      return {
        posts: [],
        loading: false
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
      this.$Progress.start()
      this.loading = true
      let url = 'https://hapi-blog.herokuapp.com/v1/articles'
      if (this.filters && this.filters.tag) {
        url = `https://hapi-blog.herokuapp.com/v1/articles?tag=${this.filters.tag}`
      }
      axios.get(url)
        .then(response => {
          this.$Progress.finish()
          this.loading = false
          this.posts = response.data
        })
        .catch(e => {
          this.$Progress.fail()
          this.loading = false
          this.showErrorMsg({message: '... we got problems fetching the articles', title: 'Uh oh!', timeout: 5000})
        })
    }
  }
</script>
