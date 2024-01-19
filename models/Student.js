const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    teachers: [{
        name: String,
        subject: String
    }],
    grade: {
        type: Number,
        require: true
    },
    assignments: [{
        name: String,
        subject: String
    }]
})

studentSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})
studentSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, 'secret')
    return token
}

const Student = mongoose.model('Student', studentSchema)

module.exports = TeacherStudent