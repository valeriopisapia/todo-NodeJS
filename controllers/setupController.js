var Todos = require('../models/todoModel');

module.exports = function(app){
    
    app.get('/api/setupTodos', function(req, res){
        
         var starterTodos = [
           {
               username: 'test',
               todo: 'Buy book',
               date: new Date(),
               isDone: false
           },
           {
               username: 'test',
               todo: 'Feed dog',
               date: new Date(),
               isDone: false
           },
           {
               username: 'test',
               todo: 'Learn Node',
               date: new Date(),
               isDone: false
           }
       ];
        
        Todos.create(starterTodos, function(err, results){
           res.send(results);
        }); 
    });
}