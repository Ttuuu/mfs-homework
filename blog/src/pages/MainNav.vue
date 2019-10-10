<template>
  <nav class='nav'>
    <h1>mfs-blog</h1>
    <ul class='links'>
      <li><router-link to='/'>home</router-link></li>
      <li><router-link to='/about'>about</router-link></li>
    </ul>
  </nav>

</template>
<script>
export default {
  name:'main-nav',
  data(){
    return{
      
    }
  }
}
</script>
<style scoped lang='stylus'>
.nav
  display flex
  justify-content space-between
  align-items center

.links
  display flex
  li
    padding 10px


</style>