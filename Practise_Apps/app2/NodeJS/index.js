//package import
const express = require('express');
const bodyParser = require('body-parser');

//local import
const { mongoose } = require('./db.js'); //es6 syntax
var employeeController = require('./cotrollers/employeeController')

var app = express(); //main app variable(co function to call express)

//Body parser middleware
app.use(bodyParser.json());
app.use('/employees', employeeController);


app.listen(3000,() => console.log('Server started on port: 3000'));

