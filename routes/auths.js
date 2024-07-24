const express = require('express');
const router = express.Router();

const {login} =require('../controllers/login');
const {signup} =require('../controllers/signup');
const {getEmail} =require('../controllers/getEmail');

router.post('/login', login);
router.post('/signup', signup);


//middleware routes
const{authcheck,isadmin,isstudent}=require('../middleware/middle');
router.get('/admin',authcheck,isadmin,(req,res)=>{
    res.status(200).json({message: 'Welcome Admin'});
});
router.get('/student',authcheck,isstudent,(req,res)=>{
    res.status(200).json({message: 'Welcome Student'});
});
router.get('/getEmail',authcheck,getEmail);

module.exports = router;