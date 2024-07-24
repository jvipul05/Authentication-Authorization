const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const existingUser =await User.findOne({email});
        if(existingUser)
            {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await user.save();
        res.status(201).json({message: 'User created successfully'});

    }
    catch(error){

        res.status(500).json({message: error.message});

    }
}