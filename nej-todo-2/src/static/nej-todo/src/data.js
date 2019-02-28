NEJ.define([
  'util/ajax/rest',
], function(_ajax, _p) {

  const baseURL = 'http://localhost:3000'
  const failedInfo = {
    status: 500,
    msg: 'failed'
  }

  // 获取todos
  _p.getTodos = function(cb) {
    let url = `${baseURL}/api/todos`
    _ajax._$request(url, {
      method: 'get',
      onload: function(res) {
        cb(res.data)
      },
      onerror: function(err) {
        cb([])
        alert('获取todos失败')
      }
    })
  }

  // 增加todo
  _p.addTodo = function(data, cb) {
    let url = `${baseURL}/api/todos`
    _ajax._$request(url, {
      method: 'post',
      data: data,
      onload: function(res) {
        cb(res)
      },
      onerror: function(err) {
        cb(failedInfo)
        alert('添加todo失败')
      }
    })
  }

  // 根据id删除todo
  _p.deleteTodo = function(id, cb) {
    let url = `${baseURL}/api/todos/${id}`
    _ajax._$request(url, {
      method: 'delete',
      onload: function(res) {
        cb(res)
      },
      onerror: function(err) {
        cb(failedInfo)
        alert('删除todo失败')
      }
    })
  }

  // 删除已完成的todo
  _p.deleteTodos = function(cb) {
    let url = `${baseURL}/api/todos`
    _ajax._$request(url, {
      method: 'delete',
      onload: function(res) {
        cb(res)
      },
      onerror: function(err) {
        cb(failedInfo)
        alert('删除已完成的todo失败')
      }
    })
  }

  // 根据id更新todo
  _p.updateTodo = function(id, data, cb) {
    let url = `${baseURL}/api/todos/${id}`
    _ajax._$request(url, {
      method: 'put',
      data: data,
      onload: function(res) {
        cb(res)
      },
      onerror: function(err) {
        cb(failedInfo)
        alert('更新todo失败')
      }
    })
  }

  // 批量更新todo
  _p.updateTodos = function(data, cb) {
    let url = `${baseURL}/api/todos`
    _ajax._$request(url, {
      method: 'put',
      data: data,
      onload: function(res) {
        cb(res)
      },
      onerror: function(err) {
        cb(failedInfo)
        alert('批量更新todo失败')
      }
    })
  }

  return _p
})
