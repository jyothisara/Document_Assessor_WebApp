const express = require("express");

//Models Import
const User = require("../models/userModel");
const Assessment = require("../models/assessmentModel");
const Resource = require("../models/resourceModel");
const Form = require("../models/formModel");

//Dashboard View
exports.dashboard = function(req,res){
  res.send("In dashboard");
}

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

  
//Assessment task signup
exports.signup = async (req, res) => {
  try {
   // const username = await User.findById({_id: req.params.u_id});
    const assessment = await Assessment.findByIdAndUpdate({_id: req.params.a_id }, {$set: {userSignup:true}});
    res.send({ message: "Signedup for the assessment task "+assessment.title+' successfully.' });
    res.json(assessment);
  } catch (e) {
    console.log(e);
    res.status(500).send( "Error in assessment signup" );
  }
};
  
