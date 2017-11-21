<template>
  <transition name="post">
    <article v-if="post" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ title }}</h2>

        <h3 class="post__meta">by <router-link class="post__author"
          :to="`/by/${author}`">{{ author }}</router-link>
          <span class="post__sep"></span>
          <time>{{ published }}</time>
        </h3>

        <blockquote class="post__subtitle">{{ description }}</blockquote>
      </header>

      <section class="post__body rte" v-html="content"></section>

      <footer class="post__footer">

      </footer>
    </article>
  </transition>
</template>

<script>

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: {},
  props: { post: String },

  data () {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      commentsReady: false
    }
  },

  watch: {
    post (to, from) {
      if (to === from || !this.post) return

      this.commentsReady = false
      this.$getResource('post', to)
        .then(this.showComments)
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
    console.log('assaas')
  }
}
</script>
