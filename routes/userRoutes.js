const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userController')

// Create
router.post('/', userControllers.createUser)

// Login
router.post('/login', userControllers.loginUser)

// Update
router.put('/:id', userControllers.updateUser)

// Destroy
router.delete('/:id', userControllers.deleteUser)

module.exports = router