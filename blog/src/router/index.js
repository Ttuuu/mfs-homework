import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import Article from '../components/Article'
import Archive from '../pages/Archive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/about',
      name:'About',
      component: About
    },
    {
      path:'/article/:id',
      name:'Article',
      component: Article
    },
    {
      path:'/archive/:year/:month',
      name:'Archive',
      component: Archive
    }
  ]
})
