const router=require('koa-router')()
const articleRouter=require('./article')
const targetRouter=require('./target')
const archiveRouter=require('./archive')
const userRouter=require('./user')
const sessionRouter=require('./session')
const {User,Permission}=require('../../model')

router.prefix('/api')

router.use(async (ctx,next)=>{
  const {method,url}=ctx.request
  const userId=ctx.session.userId || 1
  console.log(userId)
  const permissions=await Permission.findAll({
    include:[{model:User,
    where:{id:userId}}]
  })
  console.log(url)
  permissions.forEach(i=>console.log(new RegExp(i.dataValues.path).test(url)))
  if(permissions.some(i=>i.dataValues.method==method && new RegExp(i.dataValues.path).test(url))){
      await next()
    }else{
      console.log('no permission')
      ctx.body={
        err:1,
        info:'no permission',
        data:null
      }
  }
})
router.get('/',async ctx=>{
  ctx.body='api'
})

router.use(articleRouter.routes(), articleRouter.allowedMethods())
router.use(targetRouter.routes(), targetRouter.allowedMethods())
router.use(archiveRouter.routes(), archiveRouter.allowedMethods())
router.use(userRouter.routes(), userRouter.allowedMethods())
router.use(sessionRouter.routes(), sessionRouter.allowedMethods())


module.exports = router