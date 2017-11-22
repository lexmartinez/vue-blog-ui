<template>
  <div>
    <!-- Header -->
    <header id="header">
      <h1><router-link :to="'/'">Lex Mart&iacute;nez</router-link>
      </h1>
      <nav class="links">
        <ul>
          <!--<li><a href="#">About Me</a></li>-->
          <!--<li><a href="#">CV</a></li>-->
          <!--<li><a href="#">Feugiat</a></li>-->
          <!--<li><a href="#">Tempus</a></li>-->
          <!--<li><a href="#">Adipiscing</a></li>-->
        </ul>
      </nav>
      <nav class="main">
        <ul>
          <!--<li class="search">-->
            <!--<a class="fa-search" href="#search">Search</a>-->
            <!--<form id="search" method="get" action="#">-->
              <!--<input type="text" name="query" placeholder="Search" />-->
            <!--</form>-->
          <!--</li>-->
          <li>
            <a class="fa-twitter" href="https://twitter.com/lex0316" target="_blank">Twitter</a>
          </li>
          <li>
            <a class="fa-github-alt" href="https://github.com/lexmartinez" target="_blank">Github</a>
          </li>
          <li>
            <a class="fa-user-circle-o" @click="modal = !modal">About Me</a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="about-overlay" v-if="modal" @click="modal = !modal" >
      <div class="about-wrapper">
        <img src="https://avatars3.githubusercontent.com/u/17863319?s=460&v=4" class="about-avatar"/>
        <br/>
        <header style="text-align: center">
          <h1>About Me</h1>
        </header>
        <p style="text-align: center">
          Hi, I'm Arlex Mart&iacute;nez!<br/> Front-end Developer at Batteries911. JavaScript Surfer. NodeJS lover. Focused on web technologies.
          <br/>Author this blog. Guitar enthusiast 🤘
        </p>
        <p style="text-align: center">Find me on <a class="fa fa-github-alt" href="https://github.com/lexmartinez" target="_blank"></a> and <a class="fa fa-twitter" href="https://twitter.com/lex0316" target="_blank"></a>, DMs are open!</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-nav',
  props: {
    navs: Number,
    content: Object,
    filters: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {modal: false}
  }
}
</script>
