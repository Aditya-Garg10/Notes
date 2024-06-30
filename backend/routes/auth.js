const User = require('../models/User')
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SEC = 'Harryisagoodb$oy'
const fetchuser = require("../middleware/fetchuser")

//create a user using : POST "/api/auth".No login Required
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:5}),
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password').isLength({min:5})
], async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success,erros: errors.array()})
    }
    try{
        let user = await User.findOne({email: req.body.email});
        console.log(user)
    if (user){
        success = false
        return res.status(400).json({success,error: "sorry a user with this email exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    })
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SEC)
    //console.log(jwtData);
    success = true
    res.json({success, authtoken})
    }
    catch(error){
        success = false
        console.error(success,error.message);
        res.status(500).send("some Error Occured");
        }
})
//authenticate a user using : POST "/api/auth/login".No login Required

router.post('/login',[
    body('password','enter a valid password').notEmpty(),
    body('email','enter a valid email').isEmail(),
], async(req, res)=>{

//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         success = false;
//         return res.status(400).json({success,erros: errors.array()})
// }

const {password} = req.body;

try{
    let user = await User.findOne({email: req.body.email});
    //console.log(user)
    if(!user){
        return res.status(400).json({success,error: "try to login with correct credentials"})
    }
    const passwordCompare = (password === secPass); 
    // console.log(passwordCompare)
    // console.log(user.password)
    if(!passwordCompare){
        success = false;
        return res.status(400).json({success,error: "try to login with correct credentials"})
    }
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SEC)
    success = true;
    res.json({success,authtoken})
}
catch (error){
    console.error(error.message);
    res.status(500).send("some error1 occured");
}
})

//get details of logged in user using : POST "/api/auth/getuser".No login Required
router.post('/logged', fetchuser,async(req, res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error1 occured");
}
})

module.exports = router
