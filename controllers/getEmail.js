const User = require('../models/user');

exports.getEmail = async (req, res) => {  
 try{
       const user=await User.findById(req.user.id);
         res.status(200).json({data:user});
 }
    catch(error){
        res.status(500).json({message: error.message});
    }
}