var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index'); //indexpage in routes folder
var tasks = require('./routes/tasks'); //tasks in routes folder for api to mongo

var app = express(); //main app variable
var port = 3000;

//view engine
app.set('views',path.join(__dirname,'views')); //views folder for the views
app.set('view engine', 'ejs'); //use ejs as engine
app.engine('html', require('ejs').renderFile); //render file with html extension

//Set static folder for angular stuff
app.use(express.static(path.join(__dirname, 'client'))); //angular files will go to client folder

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api',tasks); //to interact with api use /api

app.listen(port, function(){
    console.log('Server started on port ' +port );
});  