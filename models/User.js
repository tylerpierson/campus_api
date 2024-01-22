const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'admin'
    },
    campus: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
    },
    subjects: [{
        type: String,
        required: true
    }],
    teachers: [{
        name: String,
        grade: Number,
        subjects: [String],
        students: [String]
    }],
    assignments: [{
        type: String,
        required: true
    }],
    completedAssignments: [{
        assignment: String,
        completed: {
            type: Boolean,
            default: false
        }
    }],
    students: [{
        name: String,
        grade: Number,
        teachers: [String],
        subjects: [String]
    }]
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, 'secret')
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User