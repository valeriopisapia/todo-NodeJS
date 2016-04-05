var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema ({
    username: String,
    todo: String,
    date: Date,
    isDone: Boolean
});


var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;