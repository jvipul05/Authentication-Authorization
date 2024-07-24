// authcheck isadmin isstudent
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.authcheck = (req, res, next) => {
    try{
        const token=req.body.token ||  req.cookies.token ||req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'token not found'});
        }
        try{
            const decoded =jwt.verify(token, process.env.JWT_SECRET);
            req.user=decoded;
            console.log(decoded);
            

        }catch(error){
            return res.status(401).json({message: 'Invalid token'});
        }
        next();
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.isadmin=(req, res, next) => {
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({message: 'You are not authorized to access this admin'});
        }
        next();
    }catch(error){
        res.status(500).json({
            success: false, 
            message: error.message});
    }
}

exports.isstudent=(req, res, next) => {
    try{
        if(req.user.role !== 'student'){
            return res.status(403).json({message: 'You are not authorized to access this student'});
        }
        next();
    }catch(error){
        res.status(500).json({
            success: false, 
            message: error.message});
    }
}