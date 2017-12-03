<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <blog-nav :content="content" :filters="filters" :navs="navs"/>
    <blog-feed :filters="filters" v-if="!post"/>
    <blog-post :post="post" v-if="post"/>
    <blog-footer/>
    <div style="position:fixed; top:0; left: 0; width: 100%; z-index:-5; height: 100%">
      <vue-particles
        color="#898989"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#898989"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="0.7"
      >
      </vue-particles>
    </div>
  </main>
</template>

<script>
  import BlogNav from './BlogNav'
  import BlogFeed from './BlogFeed'
  import BlogPost from './BlogPost'
  import BlogFooter from './BlogFooter'

  export default {
    name: 'blog',
    components: { BlogNav, BlogFeed, BlogPost, BlogFooter },
    resource: 'Blog',
    props: {
      post: String,
      tag: String
    },

    data () {
      return {
        navs: 0,
        title: '',
        labels: {
          post: '',
          tag: ''
        }
      }
    },

    computed: {
      content () {
        return { title: this.title, labels: this.labels }
      },
      filters () {
        let filters = {}

        if (this.post) filters.post = this.post
        if (this.tag) filters.tag = this.tag

        return filters
      }
    },

    watch: {
      '$route.name' (to, from) {
        if (to !== from) this.navs++
      },
      post: (newVal) => {
        if (newVal === undefined) {
          document.title = 'Lex Mart\u00EDnez'
        }
      }
    }
  }
</script>
