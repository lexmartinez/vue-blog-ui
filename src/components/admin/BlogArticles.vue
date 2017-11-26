<template>
  <transition name="fade">
  <article class="post">
    <header>
      <div class="title">
        <h2>
          <i class="fa fa-newspaper-o"></i> Articles
        </h2>

      </div>

    </header>

  </article>
  </transition>
</template>

<script>

export default {
  name: 'blog-articles',
  resource: 'BlogArticles',
  data () {
    return {
      articles: []
    }
  }
}
</script>
