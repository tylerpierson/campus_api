const express = require('express')
const router = express.Router()
const teacherControllers = require('../controllers/teacherControllers')

// Create
router.post('/', teacherControllers.createTeacher)

// Login
router.post('/login', teacherControllers.loginTeacher)

// Update
router.put('/:id', teacherControllers.updateTeacher)

// Destroy
router.delete('/:id', teacherControllers.deleteTeacher)

module.exports = router