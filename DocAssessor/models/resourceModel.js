/**************************************************************
*   resourceModel.js
*   This file includes the javascript codes for the database   
*   model for collection "resources" in DocAssessor Database
*   
*   @Author : Jyothi Sara Thomas
**************************************************************/

const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
      },
    link: {
        type: String
        
      },
    form: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Form'
        }
    ,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userName: String
    },
    submissionStatus: {
        type: Boolean,
        required: true
      }

    });

module.exports = mongoose.model('Resource', resourceSchema);