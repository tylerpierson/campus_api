const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userController')

// Index
router.get('/', userControllers.index)

// Create
router.post('/', userControllers.create)

// Login
router.post('/login', userControllers.login)

// Update
router.put('/:id', userControllers.update)

// Destroy
router.delete('/:id', userControllers.delete)

// Show
router.get('/:id', userControllers.show)

module.exports = router