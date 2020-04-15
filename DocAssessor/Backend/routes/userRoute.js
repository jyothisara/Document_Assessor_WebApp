const express = require("express");
const router = express.Router();


// Controllers
const userController = require('../controllers/userController');
const assessmentController = require('../controllers/assessmentController');
const auth = require('../middleware/auth')

//Routes
router.post( '/signup',  userController.validate('signup'),  userController.signup)
router.post( '/login',  userController.login)
router.get('/me', auth,userController.session)
router.get('/assessment/:id', assessmentController.dashboard)

module.exports = router;
