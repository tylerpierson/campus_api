const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true
    }
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher