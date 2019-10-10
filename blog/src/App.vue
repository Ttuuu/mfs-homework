<template>
  <div id="app" class='container'>
    <main-nav></main-nav>
    <router-view/>
  </div>
</template>

<script>
import MainNav from './pages/MainNav'
export default {
  components:{ MainNav},
  name: 'App'
}
</script>

<style lang='stylus'>
@import './assets/css/base.css';
ol,ul,body
  margin 0
  padding 0

ol,ul
  list-style none
.container
  width 80%
  margin 0 auto
</style>
