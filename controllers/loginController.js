
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

exports.loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "User does not exists"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})
        
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
        
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
}