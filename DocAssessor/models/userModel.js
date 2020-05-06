/**************************************************************
*   userModel.js
*   This file includes the javascript codes for the database   
*   model for collection "users" in DocAssessor Database
*   
*   @Author : Jyothi Sara Thomas
**************************************************************/

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
   // n_type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model('User', userSchema);