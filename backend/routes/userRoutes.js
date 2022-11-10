const express = require('express')
const userController = require('../controllers/userController')
const { signup, login } = require('../controllers/userController')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.existingUser, signup)

//login route
router.post('/login', login)

module.exports = router