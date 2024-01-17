const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    students: [{
        name: String
    }]
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher