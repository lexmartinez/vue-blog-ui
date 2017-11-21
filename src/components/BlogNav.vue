<template>
  <div>
    <!-- Header -->
    <header id="header">
      <h1><a href="#">Lex Mart&iacute;nez</a></h1>
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
            <a class="fa-user-circle-o" href="/about">About Me</a>
          </li>
          <li>
            <a class="fa-twitter" href="https://twitter.com/lex0316" target="_blank">Twitter</a>
          </li>
          <li>
            <a class="fa-github-alt" href="https://github.com/lexmartinez" target="_blank">Github</a>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Menu -->
    <section id="menu">

      <!-- Search -->
      <section>
        <form class="search" method="get" action="#">
          <input type="text" name="query" placeholder="Search" />
        </form>
      </section>

      <!-- Links -->
      <section>
        <ul class="links">
          <li>
            <a href="#">
              <h3>Lorem ipsum</h3>
              <p>Feugiat tempus veroeros dolor</p>
            </a>
          </li>
          <li>
            <a href="#">
              <h3>Dolor sit amet</h3>
              <p>Sed vitae justo condimentum</p>
            </a>
          </li>
          <li>
            <a href="#">
              <h3>Feugiat veroeros</h3>
              <p>Phasellus sed ultricies mi congue</p>
            </a>
          </li>
          <li>
            <a href="#">
              <h3>Etiam sed consequat</h3>
              <p>Porta lectus amet ultricies</p>
            </a>
          </li>
        </ul>
      </section>

      <!-- Actions -->
      <section>
        <ul class="actions vertical">
          <li><a href="#" class="button big fit">Log In</a></li>
        </ul>
      </section>

    </section>
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
  }
}
</script>
