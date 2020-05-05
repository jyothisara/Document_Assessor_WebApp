/**************************************************************
*   formModel.js
*   This file includes the javascript codes for the database   
*   model for collection "forms" in DocAssessor Database.
* 
*   @Author : Jyothi Sara Thomas
**************************************************************/

const mongoose = require('mongoose');

//Model for forms collection 
const formSchema = new mongoose.Schema({
    link: {
        type: String
      },
    text: {
        type: String,
        required: true
      },
    rating: {
        type: Number,
        required: true
      }
});

module.exports = mongoose.model('Form', formSchema);