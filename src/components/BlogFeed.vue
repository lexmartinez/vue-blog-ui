<template>
  <div id="main">
    <div v-if="posts && posts.length">
    <article class="post" v-for="post in posts">
      <header>
        <div class="title">
          <h2><a href="#">{{post.title}}</a></h2>
          <p>By <strong>JANE DOE</strong> &lt;&#064;janedoe&gt;</p>
        </div>
        <div class="meta">
          <div class="date">
            <div class=" ">August</div>
            <div class="day">28</div>
          </div>
        </div>
      </header>
      <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
      <footer>
        <ul class="actions">
          <li><a href="#" class="button big">Continue Reading</a></li>
        </ul>
        <ul class="stats">
          <li><a href="#">General</a></li>
          <li><a href="#" class="icon fa-heart">28</a></li>
          <li><a href="#" class="icon fa-comment">128</a></li>
        </ul>
      </footer>
    </article>
      <ul class="actions pagination">
        <li><a href="" class="disabled button big previous">Previous Page</a></li>
        <li><a href="#" class="button big next">Next Page</a></li>
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
      posts: [],
      errors: [],
      transition: 'preview-appear'
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
    axios.get(`https://hapi-blog.herokuapp.com/v1/articles`)
      .then(response => {
        this.posts = response.data
      })
      .catch(e => {
        this.showErrorMsg({message: '... we got problems fetching the articles', title: 'Uh oh!', timeout: 5000})
      })
  }
}
</script>
