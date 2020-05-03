const express = require("express");
//Models
const User = require("../models/userModel");
const Assessment = require("../models/assessmentModel");
const Resource = require("../models/resourceModel");
const Form = require("../models/formModel");

//Dashboard View
exports.dashboard = function(req,res){
  //res.render(path.join(__dirname,'../view/home.html'));
  res.send("In dashboard");
}

	//Assessments List
  exports.assessments = async (req, res) => {
    try {
      console.log("In assessment dashboard   "+ req.params.u_id);
      const username = await User.findById({_id: req.params.u_id});
     const resource = await Resource.find({user:{id: username.id,userName: username.userName}}, {id:1});
      //const resource = await Resource.find({user:{id: username.id,userName: username.userName} });
      //const assessment = await Assessment.find({resources:resource.id }) ;
      const assessment = await Assessment.find({resources: { $in: resource }}) ;
      res.json(assessment);
       //res.send({ message: resource });
    } catch (e) {
      console.log(e); 
      res.status(500).send( "Error in Fetching assessments" );
    }
  };

  
//Assessment task signup
exports.signup = async (req, res) => {
  try {
    const username = await User.findById({_id: req.params.u_id});
    //const resource = await Resource.findOne({user:{id: username.id,userName: username.userName} });
    //const assessment = await Assessment.findOneAndUpdate({resources: {$elemMatch:{ id:resource.id }}}, {$set: {userSignup:true}});
    const assessment = await Assessment.findByIdAndUpdate({_id: req.params.a_id }, {$set: {userSignup:true}});
    res.send({ message: "Signedup for the assessment task "+assessment.title+' successfully.' });
    res.json(resource);
  } catch (e) {
    console.log(e);
    res.status(500).send( "Error in assessment signup" );
  }
};
  

//Resouces List
exports.resources = async (req, res) => {
  try {
    const username = await User.findById({_id: req.params.u_id});
    const assessment = await Assessment.findById({_id: req.params.a_id });
   const resource = await Resource.find({_id : {$in: assessment.resources}});
    res.json(resource);
    // res.send({ message: username._id });
  } catch (e) {
    console.log(e);
    res.status(500).send( "Error in Fetching Resources" );
  }
};

exports.submitForm = async (req, res) => {
 // const username = await User.findById({_id: req.params.u_id});
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
      //res.send("Form submitted Successfully" );
      res.status(200).json("Form submitted Successfully" );
  } catch (err) {
      console.log(err.message);
      res.status(500).json("Error in submitting form");
  }
};
// //User Login
// exports.submitForm = function (req, res) {
//   let product = new Product(
//       {
//           name: req.body.name,
//           price: req.body.price
//       }
//   );

//   product.save(function (err) {
//       if (err) {
//           return next(err);
//       }
//       res.send('Product Created successfully')
//   })
// };



// //Assessments List
// exports.resources = async (req, res) => {
//   try {
//     const username = await User.findById({_id: req.params.u_id});
//     const assessment = await Assessment.find({user:{id: username.id,userName: username.userName} });
//     res.json(assessment);
//     // res.send({ message: username._id });
//   } catch (e) {
//     console.log(e);
//     res.send({ message: "Error in Fetching assessments" });
//   }
// };

