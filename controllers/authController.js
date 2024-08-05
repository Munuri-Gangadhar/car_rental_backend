const {validationResult}=require('express-validator');
const User=require('../models/user');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.register=async(req,res)=>{
    try{
        const {username,password,role}=req.body;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const user=new User({username,password,role});
        await user.save();
        res.status(201).json({message:'User registered successfully'});
    }catch(error){
         res.status(400).json({error:error.message});
    }
}

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

// Login route handler
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id, user.role);
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.logout=(req,res)=>{
    res.clearCookie('token');
    res.json({message:'Logout successful'});
}