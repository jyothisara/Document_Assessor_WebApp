const express = require("express");
//Models
const User = require("../models/userModel");
const Assessment = require("../models/assessmentModel");


//Assessments List
exports.dashboard = async (req, res) => {
  try {
    const username = await User.findById({_id: req.params.u_id});
    const assessment = await Assessment.find({user:{id: username.id,userName: username.userName} });
    res.json(assessment);
    // res.send({ message: username._id });
  } catch (e) {
    res.send({ message: "Error in Fetching assessments" });
  }
};

exports.signup = async (req, res) => {
  try {
    const username = await User.findById({_id: req.params.u_id});
    const assessment = await Assessment.findOneAndUpdate({_id:req.params.a_id,user:{id: username.id,userName: username.userName} }, {$set: {userSignup:true}});
    res.send({ message: "Signed for the assessment task "+assessment.title+' successfully.' });
  } catch (e) {
    res.send({ message: "Error in assessment signup" });
  }
};