<template>
  <h1>Login</h1>
</template>

<script>
export default {
  name: 'blog-admin',
  resource: 'BlogAdmin',
  beforeMount () {
    this.$auth.authenticate('github').then((a) => {
      console.log(a)
    })
  }
}
</script>
