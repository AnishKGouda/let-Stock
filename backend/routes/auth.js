const express=require('express');
const router=express.Router();
const User = require('../models/User') 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const  jwt_secret ="this is not a secret"




router.post('/signup',
//validators
[
    body('password',"should be atleast 8 characters").isLength({ min: 8 }),
    body('name','enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail()] ,async (req,res)=>{

        let success=false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
try{
    //checking if email already exists
        let user= await User.findOne({email:req.body.email})
        if(user)
         { return res.status(400).json({error:"user already exists "});
    }
  //password hashing and salting
    const salt= await bcrypt.genSalt(10);
     secPass= await bcrypt.hash(req.body.password,salt)


    //creating new user
         user= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
          })
        //authtoken
          const data={
            user:{
              id:user.id
            }

          }
        const authToken=jwt.sign(data,jwt_secret)
        success=true
       let userId=user.id
        res.json({userId,success,authToken})
             
        
        }catch(error){
            console.error(error)
            res.status(500).json({error:"internal server error"})

          }
        })
    router.post('/login',[
    body('password',"should be atleast 8 characters").isLength({ min: 8 }),
    body('email','enter a valid email').isEmail()] ,async (req,res)=>{
      let success =false
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const {email,password}=req.body;
        try{
          const user= await User.findOne({email:req.body.email});
          if(!user){
         return res.status(400).json({error:"invalid credentials"})

          }
         
          const passcompare= await bcrypt.compare(password,user.password)
          if (!passcompare){
            return res.status(400).json({error:"invalid credentials"})

          }
          const data={
            user:{
              id:user.id
            }

          }
        const authToken=jwt.sign(data,jwt_secret)
        success = true  
        res.json({success,authToken})
         
        }catch(error){
          console.error(error)
          res.status(500).json({error:"internal server error"})


        }
    })
    router.post('/getuser' ,fetchuser,async (req,res)=>{
     
        try {
          userId=req.user.id;
          const user=await User.findById(userId).select("-password")
          res.send(user)
        } catch (error) {
          console.error(error)
          res.status(500).json({error:"internal server error"})          
        }

      }  )

module.exports=router
