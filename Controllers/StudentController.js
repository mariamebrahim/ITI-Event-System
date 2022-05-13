const Student=require("./../Models/StudentModel");
const createError=require('http-errors');
const {studauthschema}=require("../Helpers/Validation_Schema");
const jwt=require('jsonwebtoken');

const{signAccessToken}=require("../Helpers/jwt_helper");



//get all student data
module.exports.getAllStudents=((request,response,next)=>{
    Student.find()
    .then((data)=>{
        response.status(200).json({data})

    }).catch(error=>{next(error)})

})

//Student can update his data
module.exports.UpdateStudent=((request,response,next)=>{
    Student.updateOne({email:request.body.email},{
        $set:{
            email:request.body.email,
            password: request.body.password
        }
    }).then((data)=>{
        if(data.matchedCount==0)
            throw new Error("Student doesn't exist");
        response.status(200).json({message:"Student Data is Updated",data})

    })
    .catch(error=>next(error))
})


//Admin can update Student data
module.exports.AdminUpdateStudent=((request,response,next)=>{
    Student.updateOne({email:request.body.email},{
        $set:{
            email:request.body.email,
        },$push:{Events:request.body.Events}
    }).then((data)=>{
        if(data.matchedCount==0)
            throw new Error("Student doesn't exist");
        response.status(200).json({message:"Student Data is Updated",data})

    })
    .catch(error=>next(error))
})

//Get all Student Events
module.exports.getAllStdEvents=((request,response,next)=>{
    Student.find({"_id":request.body.id},{"Events":1})
    .then((data)=>{
        response.status(200).json({data})

    })
    .catch(error=>{
        next(error);//3shan a5leh troo7 3al error middleware w m5lehash t3ml clash 3shan da promise 7ayb2a m7tag catcg tanya
    })


})


//Create a new Student //register student
module.exports.CreateStudent=(async(request,response,next)=>{

    try{
        const result=await studauthschema.validateAsync(request.body);  
        const doesexist=await Student.findOne({email:result.email})
        if (doesexist) 
            throw createError.Conflict(`${result.email} is already been registered!`);
        let std=new Student(result);
        
            //save new student in database
            const savedstud= await std.save()

            const accessToken=await signAccessToken(savedstud.id);
            response.send(accessToken)
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


//Delete Student
module.exports.DeleteStudent=((request,response,next)=>{
    Student.deleteOne({_id:request.body.id})
    .then((data)=>{
        if(data.deletedCount==0)
            throw new Error("Student doesn't exist");
        else
            response.status(200).json({message:"Student Deleted"})
    })
    .catch(error=>{
        next(error)
    })
})


