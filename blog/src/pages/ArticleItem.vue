<template>
  <div class='article-item'>
    <h3>{{data.title}}</h3>
    <div class='desc'>
      <span class='target'>{{data.target}}</span>
      <span class='circle'></span>
      <span class='date'>{{data.date}}</span>
      <span class='circle'></span>
      <span class='click-times'>{{data.clickTimes}}</span>
    </div>
    <div class='content' v-if=showDetail>{{data.content}}</div>
    <div class='content' v-else>{{data.content|clip}}</div>
    <div v-if='!showDetail' class='view-article'>
      <router-link :to='"/article/"+showId'>查看文章</router-link>
    </div>
    
  </div>
</template>
<script>
export default {
  props:{
    showDetail:{
      type:Boolean,
      default:false
    },
    data:{
      require:true,
      type:Object
    },
    showId:{
      type:Number
    }
  },
  name:'article',
  filters:{
    clip:function(string){
      if(string.length>100){
        return string.substr(0,100)
      }else{
      return string
      }
    }
  },
  data(){
    return{

    }
  }
}
</script>
<style scoped lang='stylus'>
.article-item{
  h3{
    text-align center
  }
  .desc{
    display flex
    justify-content center
    align-content center
    align-items center
    text-align center
    .circle{
      display block
      height 4px
      width 4px
      background-color black 
      border-radius 50%
    }
    .target,.date,.click-times{
      color gray
      font-size 12px
      margin 0 5px
    }
  }
  .content{
    margin-top 20px
    line-height 1.5
  }
  .view-article{
    margin 20px
    text-align center
    font-size 14px
    a{

      color black 
      text-decoration none

      &:after{
        content '|'
        display inline-block
        margin 0 10px
        font-weight 700
      }
      &:before{
        content '|'
        display inline-block
        margin 0 10px
        font-weight 700

      }
    }
  }
}
</style>