var express = require('express');
var router = express.Router(); 
var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function (app) {
    
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // ROUTES FOR OUR API
    //=============================================================================
    var router = express.Router();// get an instance of the express Router

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });
    
    // test route to make sure everything is working (accessed at GET http://localhost:3000/)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });
    
    router.get('/todos', function(req, res){
       Todos.find(function(err, todos){
           if (err) throw err;
           
           res.send(todos);
       });
    });
    
    router.get('/todos/:unname', function(req, res){
       Todos.find({username:req.params.unname},
                 function(err, todos){
           if (err) throw err;
           
           res.send(todos);
       }); 
    });
    
    router.get('/todo/:id', function(req, res) {
       
       Todos.findById({ _id: req.params.id },                        
           function(err, todo) {
                if (err) throw err;

                res.send(todo);
           });
    });

    router.post('/todo', function(req, res){
       if (req.body.id){
           Todos.findByIdAndUpdate(req.body.id,
                                  { todo: req.body.todo, date: req.body.date, isDone: req.body.isDone
           }, function(err, todo){
               if (err) throw err;
               
               res.send('Todo updated successfully');
           });
       } else {
           var newTodo = Todos({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               date: req.body.date
           })
           
           newTodo.save(function(err){
              if (err) throw err;
               res.send('Insert new Todo successfully');
           });
       } 
    });
    
    router.delete('/todo', function(req, res){
       Todos.findByIdAndRemove(req.body.id, function(err){
           if (err) throw err;
           res.send('Todo deleted successfully');
       }) 
    });
    
    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    app.use('/api', router);
}