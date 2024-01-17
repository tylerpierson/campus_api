const express = require('express')
const router = express.Router()
const studentControllers = require('../controllers/studentControllers')

// Login
router.post('/login', studentControllers.loginStudent)

module.exports = router