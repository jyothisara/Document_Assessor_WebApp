const express = require('express');
var router = express.Router(); 
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

router.get ('/' , (req, res) => {
    Employee.find((err, docs) => {
        if(!err) {res.send(docs); }
        else {console.log('Error in Retrieving Employees : ' + JSON.stringify(err, undefined, 2));}
    });  //retrieves list of all employees from collection
});

//post request add employee records
router.post('/' , (req, res) => {   //url same as router.get
    //json for adding new record
    var emp = new Employee({  //new Employee(model name )
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {    //saves the data to mongoDB
        if(!err) {res.send(doc); }
        else {console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2));}
    });
}); 

//request for getting employee records by giving id in url
router.get ('/:id' , (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${(req.params.id}');
    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {res.send(doc); }
        else {console.log('Error in Retreiving Employee : ' + JSON.stringify(err, undefined, 2));}
    });  
}); 

//get request for updating employee records
router.get ('/:id' , (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${(req.params.id}');   
     //json to be sent for updated record
    var emp = new Employee({  //new Employee(model name )
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });

    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {  
        if(!err) {res.send(doc); }
        else {console.log('Error in Updating Employee : ' + JSON.stringify(err, undefined, 2));}
    });    //new = true gives updated value in doc, false gives old value 
});

//get request for deleting employee records
router.delete('/:id' , (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${(req.params.id}');
    
    Employee.findByIdAndRemove(req.params.id, (err, doc) => { 
        if(!err) {res.send(doc); }
        else {console.log('Error in Deleting Employee : ' + JSON.stringify(err, undefined, 2));}
    });    //new = true gives updated value in doc, false gives old value 
}); 

module.exports = router; 