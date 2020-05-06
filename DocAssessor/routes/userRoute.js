const express = require("express");
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');
const assessmentController = require('../controllers/assessmentController');

//Auth import
const auth = require('../middleware/auth')

//Routes
router.post( '/register',  userController.validate('register'),  userController.register) //new user registration
router.post( '/login',  userController.login) //User Login
router.get('/me', auth,userController.session) //Session Handling
router.get('/dashboard',assessmentController.dashboard) //DAshboard View
router.get('/user/:u_id', assessmentController.assessments) //List the assessments
router.post('/user/:u_id/assessment-signup/:a_id', assessmentController.signup) //Signup for assessment
router.get('/user/:u_id/assessment/:a_id', assessmentController.resources) //List the resources
router.post('/user/:u_id/assessment/:a_id/resource/:r_id', assessmentController.submitForm) //Submit assessment form


module.exports = router;


