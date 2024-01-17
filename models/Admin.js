const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    campus: {
        type: String,
        require: true
    },
    teachers: [{
        name: String,
        subject: String
    }]
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin