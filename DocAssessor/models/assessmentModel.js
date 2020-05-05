/**************************************************************
*   assessmentModel.js
*   This file includes the javascript codes for the database   
*   model for collection "assessments" in DocAssessor Database
*   
*   @Author : Jyothi Sara Thomas
**************************************************************/

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
