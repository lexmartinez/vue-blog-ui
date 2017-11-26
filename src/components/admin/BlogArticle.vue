<template>
  <transition name="fade">
    <article class="post">
      <div>
        <a class="button" @click="close">Close</a>
        <div>{{article.key}}</div>
      </div>
    </article>
  </transition>
</template>
<script>
// import axios from 'axios'
// import VueNotifications from 'vue-notifications'
// import BlogPost from '../BlogPost.vue'

export default {
  name: 'blog-article',
  resource: 'BlogArticle',
  props: { article: Object },
  methods: {
    close () {
      console.log(this.article)
      this.$parent.edit = false
    }
  }
}
</script>
