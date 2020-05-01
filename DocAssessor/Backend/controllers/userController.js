const express = require("express");
const {body, validationResult} = require("express-validator");
//const {validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/userModel");
const Assessment = require("../models/assessmentModel");
var path=require('path');//sandhya
var dashboard = require('../routes/dashboard');//sandhya


//User Registration
exports.validate = (method) => {
  switch (method) {
    case 'register': {
     return [ 
        body('userName', 'Invalid username. Please enter a username with minimum 6 characters').exists().isLength({min:6}),
        body('email', 'Invalid email. Please enter a valid email').exists().isEmail(),
        body('password', 'Invalid password. Please enter a valid password').isLength({min:6}),
       ]   
    }
  }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        firstName,
        lastName,
        userName,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User with this email Already Exists"
            });
        }
        let username = await User.findOne({
          userName
      });
      if (username) {
          return res.status(400).json({
              msg: "Username Already Exists"
          });
      }
        user = new User({
            firstName,
            lastName,
            userName,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                /*Sandhya */
                //res.status(200).json({
                  // token
                    
                //});
               // res.redirect(home);
         
          //res.sendFile(path.join(__dirname,'../view/home.html'));
          //res.render(path.join(__dirname,'../view/home.html'));
           
          console.log("invoked home.html");
          /**** */
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};

//User Login

exports.login= async (req,res) => {
    //const { email, password } = req.body;
    const  email = req.body.email;
    const  password  = req.body.password;
    console.log(req.body.email);
    console.log(req.body.password);
    //try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });




      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
         // if (err) throw err;
          console.log("login success");
          /*Sandhya */
          //res.status(200);
          //console.log(token);
         res.status(200).json({
            token
          });
         //res.redirect('/dashboard');
          //res.sendFile(path.join(__dirname,'../view/home.html'));
         //res.render(path.join(__dirname,'../view/home.html'));

          //console.log("invoked home.html");
          /**** */
        }
      );
    /* } catch (e) {
      console.error(e);
      /* res.status(500).json({
        message: "Server Error"
      }); 
    } */
  };

 //My profile
 
 exports.session = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  };

  