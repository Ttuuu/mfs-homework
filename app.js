var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();//生成express实例

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//设置模板引擎为ejs

app.use(logger('dev'));//日志中间件
app.use(express.json());//解析json的中间件
app.use(express.urlencoded({ extended: false }));//解析urlencoded请求体中间件
app.use(cookieParser());//cookie中间件
app.use(express.static(path.join(__dirname, 'public')));//静态文件目录设置

app.use('/', indexRouter);//转到indexRouter
app.use('/users', usersRouter);//或usersRouter

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));//访问不存在url时转到404
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};//development下将错误信息渲染并显示

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
