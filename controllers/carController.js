const Car=require('../models/car');

exports.createCar=async(req,res)=>{
    try{
      const {name,manufacturingYear,price}=req.body;
      const car=new Car({name,manufacturingYear,price});
      await car.save();
      res.status(201).json(car);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

exports.getCars=async(req,res)=>{
    try{
       const cars=await Car.find();
       res.json(cars);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}


exports.updateCar=async(req,res)=>{
    try{
      const car=await Car.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if(!car){
        return res.status(404).json({message:'Car not found'});
      }
      res.json(car);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
exports.deleteCar=async(req,res)=>{
    try{
       const car=await Car.findByIdAndDelete(req.params.id);
       if(!car){
          return res.status(404).json({message:'Car not found'});
       }
    }catch(error){
        res.status(400).json({error:error.message});
    }
}