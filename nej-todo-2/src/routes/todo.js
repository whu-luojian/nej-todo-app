const Router = require('koa-router')
const TodoSchema = require('../db/todoSchema')

let todo = new Router()

// 查询所有的todos
todo.get('/api/todos', async (ctx) => {
  let res = await TodoSchema.find({}).then(data => {
    return {
      status: 200,
      data: data
    }
  }).catch(() => {
    return {
      status: 500,
      data: []
    }
  })
  ctx.body = res
})

// 增加一个todo
todo.post('/api/todos', async (ctx) => {
  let data = ctx.request.body
  let todoItem = await new TodoSchema(data)
  let res = await todoItem.save().then(res => {
    return {
      status: 200,
      msg: 'success'
    }
  }).catch((err) => {
    return {
      status: 500,
      msg: 'failed'
    }
  })
  ctx.body = res
})

// 批量更新todo的完成状态
todo.put('/api/todos', async (ctx) => {
  let data = ctx.request.body
  let res =  await TodoSchema.updateMany({}, data).then(() => {
    return {
      status: 200,
      msg: 'success'
    }
  }).catch(() => {
    return {
      status: 500,
      msg: 'failed'
    }
  })
  ctx.body = res
})

// 根据id更新一个todo
todo.put('/api/todos/:id', async (ctx) => {
  let id = ctx.params.id
  let data = ctx.request.body
  let res =  await TodoSchema.updateOne({id: id}, data).then(() => {
    return {
      status: 200,
      msg: 'success'
    }
  }).catch(() => {
    return {
      status: 500,
      msg: 'failed'
    }
  })
  ctx.body = res
})

// 根据id删除一个todo
todo.delete('/api/todos/:id', async (ctx) => {
  let id = ctx.params.id
  let res =  await TodoSchema.deleteOne({id: id}).then(() => {
    return {
      status: 200,
      msg: 'success'
    }
  }).catch((err) => {
    // console.log(err)
    return {
      status: 500,
      msg: 'failed'
    }
  })
  ctx.body = res
})

// 批量删除已完成的todo
todo.delete('/api/todos', async (ctx) => {
  let res =  await TodoSchema.deleteMany({completed: true}).then(() => {
    return {
      status: 200,
      msg: 'success'
    }
  }).catch((err) => {
    // console.log(err)
    return {
      status: 500,
      msg: 'failed'
    }
  })
  ctx.body = res
})

module.exports = todo
