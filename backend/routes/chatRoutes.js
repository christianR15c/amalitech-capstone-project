const express = require('express')
const { createChat, createGroupChat, addUserToGroupChat, getOneOnOneChats, getAllGroupChats } = require('../controllers/chatControllers')
const { protect } = require('../middlewares/userAuth')

const router = express.Router()

router.route('/').post(protect, createChat)
router.post('/group', protect, createGroupChat)
router.get('/oneononechats', protect, getOneOnOneChats)
router.get('/groupchats', protect, getAllGroupChats)
router.post('/addusertogroup', protect, addUserToGroupChat)

module.exports = router