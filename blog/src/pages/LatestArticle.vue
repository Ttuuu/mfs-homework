<template>
  <div class='latest-article'>
    <h2>latest article</h2>
    <ul>
      <li v-for='latestArticle in data' :key='latestArticle'><router-link :to="'/article/'+latestArticle.id">{{latestArticle.title}}</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'latest',
  props:{
    data:{
      type:[Object,Array],
      require:true
    }
  },
  data(){
    return{

    }
  }
}
</script>
<style scoped lang='stylus'>
.latest-article{
  h2{
    font-weight 500
    font-size  18px
  }
  li{
    font-size 14px
    line-height 28px
    a{
      text-decoration none
      &:visited{
      color:#000
      }
    }
  }
}
</style>