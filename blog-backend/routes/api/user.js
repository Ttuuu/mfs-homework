const router=require('koa-router')()
const {Sequelize,User}=require('../../model')
const Op=Sequelize.Op
const moment=require('moment')
router.prefix('/user')

router.post('/signin',async ctx=>{
  let {username,password,email}=ctx.request.body
  let a=await User.findOne({where:{'username':username}})
  if(a!=null){
    ctx.body={
      err:10001,
      info:'username existed',
      data:null
    }
  }else{
    let res=await User.create({username,password,email})
    ctx.body={
      err:0,
      info:null,
      data:null
    }
  }
})
router.post('/',async ctx=>{
  let {username,password}=ctx.request.body
  let res= await User.findOne({where:{'username':username}})
  if(res!=null){
    if(res.password!=password){
      ctx.body={
        err:10001,
        info:'username and password not match',
        data:null
      }
    }else{
      ctx.session.userId=res.id
      ctx.body={
        err:0,
        info:null,
        data:null
      }
    }
  }else{
    ctx.body={
      err:10001,
      info:'username not exist',
      data:null
    }
  }
})
router.get('/:time',async ctx=>{
  
  let start=moment(ctx.params.time).toDate().toISOString()
  let end=moment(ctx.params.time).add(1, 'months').toDate().toISOString()
  let res = await Article.findAll({
    where:{createdAt:{ [Op.between]:[start,end]}}
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