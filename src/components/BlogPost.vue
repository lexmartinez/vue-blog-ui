<template>
  <transition name="fade">
    <article class="post" v-if="post && article && article.id">
      <header>
        <div class="title">
          <h2>{{ article.title }}</h2>
          <p v-if="article.author">

            <popper trigger="click" :options="{placement: 'bottom'}">
              <div class="popper">
                <figure class="fir-image-figure author-popover">
                    <img class="fir-author-image fir-clickcircle" :src="article.author.avatar" :alt="article.author.name">
                  <figcaption>
                    <div class="fig-author-figure-title"><strong>{{article.author.name}}</strong></div>
                    <div class="fig-author-figure-title">{{article.author.bio}}</div>
                    <div class="fig-author-figure-title" style="text-align: right;" v-if="article.author.github && article.author.twitter">
                      <a :href="article.author.twitter" v-if="article.author.twitter"><i class="fa fa-twitter fa-2x"></i></a>
                      <a :href="article.author.github" v-if="article.author.github"><i class="fa fa-github fa-2x"></i></a>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <span slot="reference" style="cursor: pointer">
                By <strong>{{article.author.name}}</strong> &lt;&#064;{{article.author.alias}}&gt;
              </span>
            </popper>
          <span class="sharebox">
            <social-sharing :url="'https://lexmartinez.github.io/read/'+article.key"
                            :title="article.title"
                            :quote="article.title"
                            :description="article.title"
                            inline-template>
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
          <div class="date" v-if="article.publishedAt">
            <div class=" ">{{article.publishedAt | moment("MMMM")}}</div>
            <div class="day">{{article.publishedAt | moment("DD")}}</div>
          </div>
        </div>
      </header>
      <div class="image featured" v-if="article.imageUrl">
        <img :src="article.imageUrl"/>
      </div>
      <footer style="width:100%; height: 20px; margin-top: -20px" v-if="article.tags && article.tags.length">
        <ul class="stats mob-padd" style="width:100%; height: 20px">
          <li><i class="fa fa-tag"></i> Tags: </li>
          <li v-for="tag in article.tags"><a href="#">#{{tag.name}}</a></li>
        </ul>
      </footer>
      <p style="text-align: justify">{{article.abstract}}</p>
      <p><vue-markdown :source="article.content"></vue-markdown></p>
      <footer style="border-top: solid 1px rgba(160, 160, 160, 0.3);">
        <br/>
        <div style="width: 100%; margin-top: 20px">
          <vue-disqus shortname="lexmartinez" :identifier="article.key" :key="article.key" :url="'https://lexmartinez.github.io/read/'+article.key"></vue-disqus>
        </div>
      </footer>
    </article>
  </transition>
</template>

<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'
import router from '../router'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: {VueMarkdown, VueDisqus, popper: Popper},
  props: { post: String },

  data () {
    return {
      article: {},
      notFound: false
    }
  },
  beforeMount () {
    if (this.post) {
      this.$Progress.start()
      axios.get('https://hapi-blog.herokuapp.com/v1/articles?key=' + this.post)
        .then(response => {
          this.article = response.data
          document.title = this.article.title + ' <@' + this.article.author.alias + '>'
          this.notFound = false
          this.$Progress.finish()
        })
        .catch(e => {
          this.$Progress.fail()
          router.replace('/page-not-found')
        })
    }
  }
}
</script>
