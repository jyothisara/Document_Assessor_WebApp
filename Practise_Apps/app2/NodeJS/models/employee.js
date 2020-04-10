const mongoose = require('mongoose');
 
var Employee = mongoose.model('Employee' , {   //model employee 
    name: {type: String}, 
    position: {type: String},
    office: {type: String},
    salary: {type: Number},
}); //collection employee 


module.exports = {Employee};