const router = require('koa-router')()
const User=require('../model/user')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/login', async function (ctx, next) {
  if(ctx.session.userId){
    let res=User.findOne({
      where:{id:ctx.session.userId}
    })
    await ctx.render('login-success',{username:res.dataValues.username})
  }
  else await ctx.render('login')
})
router.post('/login', async function (ctx, next) {
  let res=await User.findOne({
    where:{username:ctx.request.body.username}
  })
  console.log(res)
  if(res===null){
    await ctx.render('login-fail',{message:'username not exist'})
    return
  } 
  if(res.dataValues.password===ctx.request.body.password){
    ctx.session.userId=res.dataValues.id
    await ctx.render('login-success',{username:ctx.request.body.username})
  } 
  else await ctx.render('login-fail',{message:'password and username not match'})

  
})

router.get('/signup', async function (ctx, next) {
  await ctx.render('signup')
})
router.post('/signup', async function (ctx, next) {
  await ctx.render('signup-success')
  await User.create(ctx.request.body)

})

router.get('/logout', async function (ctx, next) {
  delete ctx.session.userId
  await ctx.render('logout')
})
module.exports = router
