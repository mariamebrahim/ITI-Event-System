
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
const { signAccessToken } = require("../Controllers/authController");

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


router.post('/login',async(request,response,next)=>{
    try{

        const result=await studauthschema.validateAsync(request.body);
        const stud=await student.findOne({email:result.email});


        if(!stud) throw createError.NotFound("Student is not Registered!");

        const isMatch=await stud.isValidpassword(result.password);
        if(!isMatch) throw createError.Unauthorized("UserName or Password is incorrect");

        const accessToken=await signAccessToken(stud.id);

        response.send({accessToken});
    }catch(error)
    {
        if(error.isJoi===true) return next(createError.BadRequest("Invalid UserName or Password"))
        next(error);
    }
})

router.post('/refresh-token',async(request,respond,next)=>{
    respond.send("refresh token route")
})

router.delete('/logout',async(request,respond,next)=>{
    respond.send("logout route")
})


module.exports=router;