//declaring mongoose package to connect to db
var mongoose = require('mongoose'); 

mongoose.connect('mongodb+srv://admin:docassessor@cluster0-sktlx.mongodb.net/DocAssessor', (err) => {
    if(!err)     
        console.log('Mongodb connection succeeded');
    else        
        console.log('Error in DB Connection : ' + JSON.stringify(err, undefined, 2));
}); 
    
    module.exports = mongoose;





