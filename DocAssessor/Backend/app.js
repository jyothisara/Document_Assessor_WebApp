//package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//local import
var mongoose = require('./db.js');
var routes = require('./routes/userRoute');


//main app variable
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);


//View engine
//app.set('views',path.join(__dirname,'view'));
//app.set('view engine','ejs');
//app.engine('html',require('ejs').renderFile);
//static resource
app.use('/', express.static('view'));

//Output Port Status to Console
app.listen(PORT, () => {
    console.log('Server is up and running on port number ' + PORT);
});