const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');
const cors=require ('koa-cors')
const index = require('./routes/index')
const users = require('./routes/users')
const apiRouter = require('./routes/api')
app.keys=['blog']
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(session({
  key:'koa:sess',
  maxAge:86400000,
},app))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(async (ctx,next)=>{
  ctx.set({
    "Access-Control-Allow-Origin": "http://localhost:4200",
    "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type",
    "Access-Control-Allow-Credentials":"true"
  })
  if(ctx.method.toUpperCase()=='OPTIONS'){
    ctx.body=""
  }
  else await next()
})
// routes
app.use(cors({credentials:true}))
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(apiRouter.routes(), apiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
