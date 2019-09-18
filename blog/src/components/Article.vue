<template>
  <div class="main">
    Home
    <div class='col md-8 list'>
      <article-item :show-detail='true' :data='articles[thisId]'></article-item>
    </div>
    <div class='col md-4 xs-12'>
      <latest-article :data='latestArticles'></latest-article>
      <archive :data='archives'></archive>
      <target :data='targets'></target>
    </div>
  </div>
</template>

<script>
import LatestArticle from '../pages/LatestArticle'
import Archive from '../pages/Archive'
import Target from '../pages/Target'
import ArticleItem from '../pages/ArticleItem'
export default {
  name: 'Home',
  props:{
    showId:{
      type:Number
    }
  },
  components:{
    LatestArticle,
    Archive,
    Target,
    ArticleItem
    },
  data () {
    return {
      articles:[
        {
          id:0,
          title:'文章名',
          target:'前端',
          date:'2019/1/1',
          clickTimes:'213',
          content:'文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章'
        },
        {
          id:1,
          title:'文章名2',
          target:'前端',
          date:'2019/1/1',
          clickTimes:'213',
          content:'文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章'
        },
        {
          id:2,
          title:'文章名3',
          target:'前端',
          date:'2019/1/1',
          clickTimes:'213',
          content:'文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章'
        }
      ],
      latestArticles:[
        {
          id:0,
          title:'文章名'
        },
        {
          id:1,
          title:'文章名2'
        },
        {
          id:2,
          title:'文章名3'
        }
      ],
      archives:[
        {
          year:2018,
          month:1,
          articleNum:3
        },
        {
          year:2018,
          month:5,
          articleNum:3
        },
        {
          year:2019,
          month:1,
          articleNum:3
        }
      ],
      targets:[
        {
          name:'前端'
        },
        {
          name:'css'
        }
      ]
    }
  },
  computed:{
    thisId:function(){
      return this.$route.params.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.list{
  padding:20px
}
.main{
  margin-top: 20px
}
</style>
