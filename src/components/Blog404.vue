<template>
  <main class="blog" id="app">
    <blog-nav/>
    <transition name="fade">
      <article class="post ">
        <header>
          <div class="title">
            <h2>
              Something went wrong
            </h2>
            <p>
              Page Not Found - 404
            </p>
          </div>
          <div class="meta"></div>
        </header>
        <h2 style="padding-top:20px">Opps, sorry we can't find that page!</h2>
        <p>Either the link you followed probably broken or the page doesn't exist anymore.</p>
        <footer>
          <ul class="stats" style="width:100%"></ul>
          <ul class="actions" style="float:right !important;">
            <li style="cursor:pointer"> <router-link :to="'/blog'" class="button big">GO HOME</router-link></li>
          </ul>
        </footer>
      </article>
    </transition>
    <div class="login-footer">
      <section style="text-align: center;">
        <section id="footer">
          <p class="copyright">Copyright &copy; 2017 Arlex D. Mart&iacute;nez</p>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
import BlogNav from './BlogNav'

export default {
  name: 'blog-404',
  resource: 'Blog404',
  components: {BlogNav}
}
</script>
