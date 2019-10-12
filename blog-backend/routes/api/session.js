const router=require('koa-router')()
const {Sequelize,User}=require('../../model')
const Op=Sequelize.Op
const moment=require('moment')
router.prefix('/session')

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
router.get('/',async ctx=>{
  if(ctx.session.userId!=undefined){
    let user=await User.findOne({where:{id:ctx.session.userId}})
    if(user!=null)
      ctx.body={
        err:0,
        info:null,
        data:user
      }
  }
  else
    ctx.body={
      err:10001,
      info:'no user login',
      data:null
    }

})
router.delete('/',async ctx=>{
  let user=await User.findOne({where:{id:ctx.session.userId}})
  if(user){
    ctx.session=null
    ctx.body={
      err:0,
      info:null,
      data:null
    }
  }

  
})
module.exports = router