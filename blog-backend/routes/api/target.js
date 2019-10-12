const router=require('koa-router')()
const {sequelize, Article, Tag}=require('../../model')
router.prefix('/target')


router.get('/',async ctx=>{
  let targets=await Tag.findAll()
  console.log(targets)
  ctx.body={
    err:0,
    info:null,
    data:targets
  }
})
router.get('/all',async ctx=>{
  let targets=await sequelize.query('SELECT ID,TITLE,TARGET FROM ARTICLES GROUP BY TARGET')
  console.log(targets)
  
  ctx.body={
    err:0,
    info:null,
    data:targets
  }
})
router.get('/:name',async ctx=>{
  console.log(ctx.params.name)
  let articles=await Article.findAll({
    include:[{model:Tag,
    where:{name:ctx.params.name}}]
  })

  if(articles){
    ctx.body={
      err:0,
      info:null,
      data:articles
    }  
  }
  else {
    ctx.body={
      err:10001,
      info:'article not found',
      data:null
    }
  }

})
router.post('/',async ctx=>{
  const {name,desc}=ctx.request.body
  let tag=await Tag.create({name,desc})
  ctx.body={
    err:0,
    info:null
  }
})
module.exports = router