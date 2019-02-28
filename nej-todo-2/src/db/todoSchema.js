const mongoose = require('./index.js')

const TodoSchema = new mongoose.Schema({
  id: {type: Number},
  value: {type: String},
  completed: {type: Boolean}
})

module.exports = mongoose.model('todo', TodoSchema)
