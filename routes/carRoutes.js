const express=require('express');
const router=express.Router();
const {verifyToken,isAdmin}=require('../middleware/authMiddleware');
const {createCar,getCars,updateCar,deleteCar}=require('../controllers/carController');

router.post('/',verifyToken,isAdmin,createCar);
router.get('/',verifyToken,getCars);
router.get('/:id',verifyToken,isAdmin,updateCar);
router.delete('/:id',verifyToken,isAdmin,deleteCar);

module.exports=router;