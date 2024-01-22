const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'secret')
    const user = await User.findOne({ _id: data._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

// Index
exports.index = async function index (req, res) {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Create
exports.create = async (req, res) => {
  try{
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.json({ user, token })
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

// Login
exports.login = async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send('Invalid login credentials')
    } else {
      const token = await user.generateAuthToken()
      res.json({ user, token })
    }
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

// Update
exports.update = async (req, res) => {
  try{
    const updates = Object.keys(req.body)
    const user = await User.findOne({ _id: req.params.id })
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    res.json(user)
  }catch(error){
    res.status(400).json({message: error.message})
  }
  
}


// Destroy
exports.destroy = async function destroy (req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: `The user with the ID of ${deletedUser._id} was deleted from the MongoDB database. No further action necessary.`})
    } catch (error) {
        res.status(400).json({ message: error.message }) 
    }
}

// Show
exports.show = async function show(req, res) {
    try {
        const foundUser = await User.findOne({ _id: req.params.id });
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
