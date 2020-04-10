var mongoose = require('mongoose'); //declaring for mongoose package to connect to db

mongoose.connect('mongodb://localhost:27017/tasklist', (err) => {  // to make the  connection, calling mongoose uing connect function
    if(!err)        // err is a callback function prints in console if no error
        console.log('Mongodb connection succeeded');
    else        
        console.log('Error in DB Connection : ' + JSON.stringify(err, undefined, 2));
}); 
    // else prints the error. JSON.stringify converts err to string with 2 space intendation.


    module.exports = mongoose;