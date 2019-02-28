NEJ.define([
  'util/chain/chainable',
  'base/element',
  'base/event',
  'util/template/jst',
  'text!./components/Item/item.html'
], function($, _ele, _event, _jst, _h) {
  function Todos(data) {
    this.data = data   // 原始数据
    this.condition = 'All' // 初始筛选条件
    // _jst._$add('todo-list-template');
    _jst._$addTemplate(_h, 'todo-list-template')
    this.initEvents()
    this.render()
  }

  let pro = Todos.prototype

  pro.render = function() {
    // 根据模板ID取模板内容
    // 返回字符串类型的模板内容
    // 模板解析后还带有<textarea>标签？？？
    let _html = _jst._$get('todo-list-template', {
      todos: this.data,
      condition: this.condition
    })

    let _node = _ele._$html2node(_html)

    if (_html && _node) {
      $('.todo-list')[0].innerHTML = _node.innerText
    } else {
      $('.todo-list')[0].innerHTML = ''
    }

    // _jst._$render($('.todo-list')[0], 'todo-list-template', {
    //   todos: this.data,
    //   condition: this.condition
    // })
    this.renderTodoCount()

    // 绑定item项的事件
    setTimeout(() => {
      this.bindItemEvents()
    })
  }

  // footer、剩余项、全选/全不选按钮、清除已完成按钮渲染
  pro.renderTodoCount = function() {
    // footer
    let footer = $('.footer')[0]
    if (this.data.length === 0) {
      if (!(_ele._$hasClassName(footer, 'hide'))) {
        _ele._$addClassName(footer, 'hide')
      }
      return
    } else {
      if (_ele._$hasClassName(footer, 'hide')) {
        _ele._$delClassName(footer, 'hide')
      }
    }

    // count
    let count = this.data.filter(item => {
      return !item.completed
    }).length
    $('.todo-count')[0].innerText = `${count} items left`

    // toggle-all
    if (this.data.length && !count) {
      $('.toggle-all')[0].checked = true
    } else {
      $('.toggle-all')[0].checked = false
    }

    // Clear completed
    let clearBtn = $('.clear-completed')[0]
    if (count !== this.data.length) {
      if (_ele._$hasClassName(clearBtn, 'hide')) {
        _ele._$delClassName(clearBtn, 'hide')
      }
    } else {
      if (!(_ele._$hasClassName(clearBtn, 'hide'))) {
        _ele._$addClassName(clearBtn, 'hide')
      }
    }
  }

  pro.initEvents = function() {
    let _this = this
    // 添加todo
    $('.new-todo')._$addEvent('change', e => {
      let text = e.target.value.trim()
      if (!text) {
        return
      }
      const item = {
        id: Date.now(),
        value: text,
        completed: false
      }
      _this.data.push(item)
      _this.render()
      e.target.value = ''
    })

    // 全选/全不选
    $('.toggle-all')._$addEvent('change', e => {
      let checked = e.target.checked
      _this.data = _this.data.map(item => {
        return {
          id: item.id,
          value: item.value,
          completed: checked
        }
      })
      _this.render()
    })

    // 筛选
    $('.filters > li > a')._$addEvent('click', e => {
      this.condition = e.target.text
      
      // 筛选器样式改变
      $('.filters > li > a')._$forEach((a) => {
        if (_ele._$hasClassName(a, 'selected')) {
          _ele._$delClassName(a, 'selected')
        }
      })
      _ele._$addClassName(e.target, 'selected')
      _this.render()
    })

    // 清除已完成的内容
    $('.clear-completed')._$addEvent('click', () => {
      _this.data = _this.data.filter(item => {
        return !item.completed
      })
      _this.render()
    })
  }

  // 单个todo项的事件
  pro.bindItemEvents = function() {
    let _this = this
    // todo状态切换
    $('.todo-item-toggle')._$addEvent('change', e => {
      let checked = e.target.checked
      let id = e.target.dataset.id
      let index = _this.data.findIndex(item => {
        return item.id == id
      })
      _this.data[index].completed = checked

      _this.renderTodoCount()
    })

    // todo删除
    $('.todo-item-remove')._$addEvent('click', e => {
      let id = e.target.dataset.id
      _this.data = _this.data.filter(item => {
        return item.id != id
      })

      _this.render()
    })

    // 双击todo开启编辑模式
    $('.todo-list li')._$addEvent('dblclick', e => {
      let li = e.currentTarget
      _ele._$addClassName(li, 'editing')

      // 设置光标的位置
      let textLength = _ele._$getChildren(li, 'todo-item-edit')[0].value.length
      _ele._$getChildren(li, 'todo-item-edit')[0].setSelectionRange(textLength, textLength)
      _ele._$getChildren(li, 'todo-item-edit')[0].focus()
    })

    // todo编辑结束更新
    $('.todo-item-edit')._$addEvent('change', e => {
      let text = e.target.value
      let id = e.target.dataset.id
      let index = _this.data.findIndex(item => {
        return item.id == id
      })
      _this.data[index].value = text
      _ele._$delClassName(e.target.parentNode, 'editing')
      _this.render()
    })

    // 按enter键取消编辑
    // 此处使用keypress, 不使用keydown，keypress是用户按下一个按键，并产生一个字符（输入框中输入了）时发生，keydown是用户按下一个
    // 按键时即触发，若使用keydown则输入中文时按enter键提交输入时就会退出编辑模式
    $('.todo-item-edit')._$addEvent('keypress', e => {
      if(e.code === 'Enter') {
        _ele._$delClassName(e.target.parentNode, 'editing')
      }
    })

    // 失去焦点，取消编辑模式
    $('.todo-item-edit')._$addEvent('blur', e => {
      _ele._$delClassName(e.target.parentNode, 'editing')
    })
  }

  const data = [
    {
      id: 1,
      value: '查资料',
      completed: true
    },
    {
      id: 2,
      value: '写论文',
      completed: false
    },
    {
      id: 3,
      value: '找工作',
      completed: false
    }
  ]
  return new Todos(data)
})
