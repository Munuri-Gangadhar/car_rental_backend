const jwt=require("jsonwebtoken");
require('dotenv').config();

exports.verifyToken=(req,res,next)=>{
     const token=req.cookies.token;
     if(!token){
        return res.status(401).json({message:'Access denied'});
     }
     try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verfied;
        next();
     }catch(error){
        res.status(400).json({message:'Invalid token'});
     }
}


exports.isAdmin=(req,res,next)=>{
    if(req.user.role!=='Admin'){
        return res.status(403).json({message:'Access denied'});
    }
    next();
}