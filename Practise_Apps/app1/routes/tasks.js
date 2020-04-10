var express = require('express');
var router = express.Router();
var mongoose = require('../db.js');
var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;
var task = mongoose.model('tasks', new Schema({ //model employee 
    title: String, 
    isDone: String
})); //collection employee 


//Get all tasks
router.get('/tasks', function(req, res, next){
    task.find(function(err,tasks){
        if (!err){
            task.count(function (err, count){
                if(count==0) return res.send('No record found');
                else res.json(tasks);
            });
        }
        else res.send(err);
     });            
});

// Search task by id
router.get ('/tasks/:id' , (req, res) => {
    task.count({_id: req.params.id}, function (err, count){
        if(count==0){ return res.send('No record found with id : ' + req.params.id);}
        else task.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc); }
            else {console.log('Error in Retreiving Employee : ' + JSON.stringify(err, undefined, 2));}
        });
    });
});

    

module.exports = router;