const router=require('koa-router')()
const {sequelize, Article, Tag, Tagging, User}=require('../../model')
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
 
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

router.prefix('/article')

router.get('/',async ctx=>{
  let count=await Article.count()
  let {sort=["id","asc"], offset=0, pageSize=count}=ctx.request.query
  if(!(sort instanceof Array)) {
    sort=JSON.parse(sort)
  } 
  let articles=await Article.findAll({
    order:[sort],
    offset: +offset,
    limit: +pageSize,
    include:[{model:Tag},{model:User,attributes:['username','id']}]
  })
  ctx.body={
    err:0,
    info:null,
    pagination:{
      count:count,
      offset:+offset,
      nextOffset:(+offset + +pageSize)>count?null:(+offset + +pageSize),
      pageSize:+pageSize
    },
    data:articles,
  }
})
router.post('/',async ctx=>{
  let {title,tags,content}=ctx.request.body.article
  let author=ctx.session.userId
  content = DOMPurify.sanitize(content);

  let article=await Article.create({title,content,author})
  tags.map(async item=>{
    let tag=await Tag.findOne({where:{name:item.name}})
    if(!tag){
      tag=await Tag.create({name:item.name})
    }
      await Tagging.create({tagId:tag.id,articleId:article.id})
  })
  ctx.body={
    err:0,
    info:null,
    data:article
  }
})
router.get('/:id',async ctx=>{
  console.log(ctx.params.id)
  let article=await Article.findOne({
    where:{id:ctx.params.id},
    include:[{model:Tag}]
  })
  if(article){
    article.clickTimes++
    await article.save()
    ctx.body={
      err:0,
      info:null,
      data:article
    }  
  }
  else 
    ctx.body={
      err:10001,
      info:'article not found',
      data:null
    }
})
router.put('/:id',async ctx=>{

  if(ctx.params.id==0){
    let {title,tags,content}=ctx.request.body.data
    let author=ctx.session.userId
    content = DOMPurify.sanitize(content);
  
    let article=await Article.create({title,content,author})
    tags.map(async item=>{
      let tag=await Tag.findOne({where:{name:item.name}})
      if(!tag){
        tag=await Tag.create({name:item.name})
      }
        await Tagging.create({tagId:tag.id,articleId:article.id})
    })
    ctx.body={
      err:0,
      info:null,
      data:article
    }
  
  } else {
    let updated = await Article.findOne({
      where:{id:ctx.params.id}
    })
    updated.title=ctx.request.body.data.title
    updated.content=ctx.request.body.data.content
    await updated.save()

    ctx.request.body.data.tags.map(async item=>{
      let tag=await Tag.findOne({where:{name:item.name}})
      if(!tag){
        tag=await Tag.create({name:item.name,desc:'none'})
      }
        await Tagging.create({tagId:tag.id,articleId:updated.id})
    })
  

    ctx.body={
      err:0,
      info:null,
    }
  }
})
router.delete('/:id',async ctx=>{
  let article=await Article.findOne({
    where:{id:ctx.params.id}
  })
  if(article){
    await article.destroy()
    ctx.body={
      err:0,
      info:null,
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
module.exports = router