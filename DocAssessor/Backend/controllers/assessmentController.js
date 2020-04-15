const express = require("express");
//Models
const User = require("../models/userModel");
const Assessment = require("../models/assessmentModel");


//Assessments List
exports.dashboard = async (req, res) => {
  try {
    const username = await User.findById({_id: req.params.id});
    const assessment = await Assessment.find({user:{id: username.id,userName: username.userName} });
    res.json(assessment);
    // res.send({ message: username._id });
  } catch (e) {
    res.send({ message: "Error in Fetching assessments" });
  }
};






// exports.assessment_try = async (req, res) => {
//     const {
//         title,
//         description,
//         numResources,
//         numAssessmentsPerUser,
//         instructions,
//         user: {
//             id,
//             userName
//         },
//         userSignup
//     } = req.body;
//     try {
//        let  assessment = new Assessment({
//         title,
//         description,
//         numResources,
//         numAssessmentsPerUser,
//         instructions,
//         user: {
//             id,
//             userName
//         },
//         userSignup
//         });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send("Error in Saving");
//     }
// };