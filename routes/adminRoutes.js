const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/adminControllers')

// Create
router.post('/', adminControllers.createAdmin)

// Login
router.post('/login', adminControllers.loginAdmin)

// Update
router.put('/:id', adminControllers.updateAdmin)

// Destroy
router.delete('/:id', adminControllers.deleteAdmin)

module.exports = router