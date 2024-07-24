const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Please provide email and password'});
        }
        var user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const payload={
            email: user.email,
            role: user.role,
            id: user._id
        }
        const token=jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        user= user.toObject();
        user.token=token;
        user.password=undefined;
        const options = {
            expires: new Date(Date.now() + 1000*60*60*24*30),
            httpOnly: true
        };
        res.cookie('token', token, options).status(200).json({
            success: true,
            user,
            token,
            message: 'User logged in successfully'  });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}