/**************************************************************
*   userRoute.js
*   This file includes the javascript routes, which tell the client (browser) 
*   to go to which controller method once a specific url/path is requested. All the routes
*   for this DocAssessor application are included in this file.
*   @Author : Jyothi Sara Thomas
**************************************************************/

//package import
const express = require("express");
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');
const assessmentController = require('../controllers/assessmentController');
const auth = require('../middleware/auth')

//Routes
router.post( '/register',  userController.validate('register'),  userController.register)
router.post( '/login',  userController.login)
router.get('/me', auth,userController.session)
router.get('/dashboard',assessmentController.dashboard)
router.get('/user/:u_id', assessmentController.assessments)
router.post('/user/:u_id/assessment-signup/:a_id', assessmentController.signup)
router.get('/user/:u_id/assessment/:a_id', assessmentController.resources)
router.post('/user/:u_id/assessment/:a_id/resource/:r_id', assessmentController.submitForm)
=======
const resourceController = require('../controllers/resourceController');

//Auth import
const auth = require('../middleware/auth')

//Routes
router.post( '/register',  userController.validate('register'),  userController.register) //new user registration
router.post( '/login',  userController.login) //User Login
router.get('/me', auth,userController.session) //Session Handling
router.get('/dashboard',assessmentController.dashboard) //DAshboard View
router.get('/user/:u_id', assessmentController.assessments) //List the assessments
router.post('/user/:u_id/assessment-signup/:a_id', assessmentController.signup) //Signup for assessment
router.get('/user/:u_id/assessment/:a_id', resourceController.resources) //List the resources
router.post('/user/:u_id/assessment/:a_id/resource/:r_id', resourceController.submitForm) //Submit assessment form
>>>>>>> Stashed changes


module.exports = router;


