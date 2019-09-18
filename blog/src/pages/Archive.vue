<template>
  <div class='archive'>
    <h2>achieve</h2>
    <ul>
      <li v-for='archive in data' :key='archive'><router-link :to="'/archive/'+archive.year+'/'+archive.month">{{archive.year}}年{{archive.month}}月</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'Archive',
  props:{
    data:{
      type:Array,
      required:true
    }
  },
  data(){
    return{

    }
  }
}
</script>
<style scoped lang='stylus'>
.archive{
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