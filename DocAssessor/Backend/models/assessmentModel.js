const mongoose = require('mongoose');


const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
      },
    numAssessmentsPerUser: {
        type: Number,
        required: true
      },
    instructions: {
        type: String,
        required: true
      },
      resources: 
        [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource'
        }]
    ,
      userSignup :{
        type: Boolean,
        required: true,
        default: false
      }
    });

module.exports = mongoose.model('Assessment', assessmentSchema);
