const router=require('koa-router')()
const {Sequelize,sequelize,Article,Tag}=require('../../model/')
const Op=Sequelize.Op
const moment=require('moment')
router.prefix('/archive')

router.get('/',async ctx=>{
  console.log('called')
  let res=await sequelize.query("SELECT createdAt FROM `articles` GROUP BY DATE_FORMAT(createdAt,'%y-%m')")
  ctx.body={
    err:0,
    info:null,
    data:res[0],
  }
  
})
router.get('/:time',async ctx=>{
  
  let start=moment(ctx.params.time).toDate().toISOString()
  let end=moment(ctx.params.time).add(1, 'months').toDate().toISOString()
  let res = await Article.findAll({
    where:{createdAt:{ [Op.between]:[start,end]}},
    include:[{model:Tag}]
  })
  if (res.length!=0)
    ctx.body={
      err:0,
      info:null,
      data:res
    }
  else
    ctx.body={
      err:10001,
      info:'article not found',
      data:null
    }
})
module.exports = router