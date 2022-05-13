
const { request } = require("express");
const express=require("express");
const createError=require('http-errors');
const student=require("../Models/StudentModel");
const {authSchema}=require("../Helpers/Validation_Schema");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();
const Controller=require("../Controllers/authController");
const { CreateEvent } = require("../Controllers/EventController");

router.post('/register',async(request,respond,next)=>{
    try{
        const{email,password}=request.body;
        if(!email || !password) 
            throw createError.BadRequest();
        const doesexist=await student.findOne({email:email})
        if (doesexist) 
            throw createError.Conflict(`${email} is already been registered!`);
            let std=new Student({
                _id:request.body.id,
                email: request.body.email,
                password:request.body.password
        
            })
        
            //save new student in database
            std.save()
            .then((data)=>{
                response.status(201).json({message:"New Student Created ",data})
                console.log("student Created");
            })
            .catch(error=>next(error))

    }catch(error){
        next(error)
    }
})

router.post('/login',async(request,respond,next)=>{
    respond.send("login route")
})

router.post('/refresh-token',async(request,respond,next)=>{
    respond.send("refresh token route")
})

router.delete('/logout',async(request,respond,next)=>{
    respond.send("logout route")
})


module.exports=router;