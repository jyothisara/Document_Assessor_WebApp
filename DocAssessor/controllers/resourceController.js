/**************************************************************
*   resourceController.js
*   This file includes the javascript controller methods for the 
*   resource listing and form submission, which is the logic of   
*   how the app handles the incoming requests and outgoing 
*   responses for resources. 
*
*   @Author : Jyothi Sara Thomas
**************************************************************/


const express = require("express");

//Models Import
const Assessment = require("../models/assessmentModel");
const Resource = require("../models/resourceModel");
const Form = require("../models/formModel");


//Resouces List
exports.resources = async (req, res) => {
    try {
      const assessment = await Assessment.findById({_id: req.params.a_id });
     const resource = await Resource.find({_id : {$in: assessment.resources}});
      res.json(resource);
    } catch (e) {
      console.log(e);
      res.status(500).send( "Error in Fetching Resources" );
    }
  };
  
  
  //Form Submission
  exports.submitForm = async (req, res) => {
    const resource = await Resource.findById({_id: req.params.r_id});
    const {
        text,
        rating
    } = req.body;
    try {
        form = new Form({
          text,
          rating
      });
        await form.save();
        await Resource.findByIdAndUpdate({_id: req.params.r_id }, {$set: {form:form._id,submissionStatus:true}});
        res.status(200).json("Form submitted Successfully" );
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error in submitting form");
    }
  };
  