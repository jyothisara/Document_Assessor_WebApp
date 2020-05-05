/**************************************************************
*   assessmentController.js
*   This file includes the javascript controller methods for the 
*   assessment modules, which is the logic of how the app handles  
*   the incoming requests and outgoing responses for assessments. 
*   @Author : Jyothi Sara Thomas
**************************************************************/

const express = require("express");

//Models Import
const User = require("../models/userModel");
const Assessment = require("../models/assessmentModel");
const Resource = require("../models/resourceModel");


//Dashboard View
exports.dashboard = async (req, res) => {
  try {
    res.send("In dashboard");
  } catch (e) {
    console.log(e); 
    res.status(500).send( "Error in loading dashboard" );
  }
};

	//Assessments List
  exports.assessments = async (req, res) => {
    try {
      const username = await User.findById({_id: req.params.u_id});
     const resource = await Resource.find({user:{id: username.id,userName: username.userName}}, {id:1});
      const assessment = await Assessment.find({resources: { $in: resource }}) ;
      res.json(assessment);
    } catch (e) {
      console.log(e); 
      res.status(500).send( "Error in Fetching assessments" );
    }
  };

  
//SignUp Assessment task 
exports.signup = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate({_id: req.params.a_id }, {$set: {userSignup:true}});
    res.send({ message: "Signedup for the assessment task "+assessment.title+' successfully.' });
    res.json(assessment);
  } catch (e) {
    console.log(e);
    res.status(500).send( "Error in assessment signup" );
  }
};
  
