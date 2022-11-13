const express = require('express')
const { signup, login, searchUsers, getAllUsers, postuserchat } = require('../controllers/userController')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

//passing the middleware function to the signup
router.post('/signup', userAuth.existingUser, signup)
router.post('/login', login)
router.get('/', userAuth.protect, searchUsers)

module.exports = router