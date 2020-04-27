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
router.get('/:u_id', assessmentController.dashboard)
router.post('/:u_id/assessment-signup/:a_id', assessmentController.signup)
router.get('/:u_id/assessment/:a_id', assessmentController.resources)
router.post('/:u_id/assessment/:a_id/resource/:r_id', assessmentController.submitForm)

module.exports = router;
