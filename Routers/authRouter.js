
const { request } = require("express");
const express=require("express");
const createError=require('http-errors');
const student=require("../Models/StudentModel");
const {studauthschema}=require("../Helpers/Validation_Schema");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();
const Controller=require("../Controllers/authController");
const { CreateEvent } = require("../Controllers/EventController");
const StudentModel = require("../Models/StudentModel");

router.post('/register',async(request,response,next)=>{
    try{
        const result=await studauthschema.validateAsync(request.body);  
        const doesexist=await student.findOne({email:result.email})
        if (doesexist) 
            throw createError.Conflict(`${result.email} is already been registered!`);
        let std=new student(result);
        
            //save new student in database
            std.save()
            .then((data)=>{
                response.status(201).json({message:"New Student Created ",data})
                console.log("student Created");
            })
            .catch(error=>next(error))

    }catch(error){
        if(error.isJoi=== true) error.status=422
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