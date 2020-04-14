const express = require("express");
const router = express.Router();


// Controllers
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')

//Routes
router.post( '/signup',  userController.validate('signup'),  userController.signup)
router.post( '/login',  userController.login)
router.get('/me', auth,userController.session)

module.exports = router;
