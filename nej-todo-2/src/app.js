const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const todo = require('./routes/todo')
const app = new Koa()

// 静态资源目录
app.use(static(path.join(__dirname, './static')))

// 将formData数据解析到ctx.request.body中
app.use(bodyParser())

// 装载路由
app.use(todo.routes())
app.use(todo.allowedMethods())

app.listen(3000)
console.log('koa server is starting at port 3000')
