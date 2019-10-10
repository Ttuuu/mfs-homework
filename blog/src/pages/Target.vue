<template>
  <div class='archive'>
    <h2>target</h2>
    <ul>
      <li v-for='(tag,tagId) in data' :key='tagId'><router-link :to="'/target/'+tagId">{{tag.name}}</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Array,
      required:true
    }
  },

  name:'latest',
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
  ul{
    display flex
    flex-wrap wrap
    text-decoration none
    li{
      margin 5px

      font-size 14px
      line-height 28px
      border 1px solid green
      a{
        text-decoration none
        &:visited{
        color:#000
        }
      }
    }
  }
}
</style>