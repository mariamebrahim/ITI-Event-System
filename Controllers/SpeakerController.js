const Speaker=require("./../Models/SpeakerModel");
const {speakerauthschema}=require("../Helpers/Validation_Schema");
const createError=require('http-errors');
const{signAccessToken}=require("../Helpers/jwt_helper");



//get all speakers data
module.exports.getAllSpeakers=((request,response,next)=>{
    Speaker.find()
    .then((data)=>{
        response.status(200).json({data})

    }).catch(error=>{next(error)})

})


//Speaker can update his data
module.exports.UpdateSpeaker=((request,response,next)=>{
    Speaker.updateOne({email:request.body.email},{
        $set:{
            name:request.body.name,
            email:request.body.email,
            password:request.body.password,
            address:request.body.address
        }
    }).then((data)=>{
        if(data.matchedCount==0)
            throw new Error("Speaker doesn't exist");
        response.status(200).json({message:"Speaker Data is Updated",data})

    })
    .catch(error=>next(error))
})

//Admin can update Speaker data
module.exports.AdminUpdateSpeaker=((request,response,next)=>{
    Speaker.updateOne({email:request.body.email},{
        $set:{
            email:request.body.email,
            address:request.body.address
        },$push:{Events:request.body.Events}
    }).then((data)=>{
        if(data.matchedCount==0)
            throw new Error("Speaker doesn't exist");
        response.status(200).json({message:"Speaker Data is Updated",data})

    })
    .catch(error=>next(error))
})

//Get all Speaker Events
module.exports.getAllSpeakerEvents=((request,response,next)=>{

    Speaker.find({"email":request.body.email},{"Events":1},{"_id":0})
    .then((data)=>{
        response.status(200).json({data})

    })
    .catch(error=>{
        next(error);//3shan a5leh troo7 3al error middleware w m5lehash t3ml clash 3shan da promise 7ayb2a m7tag catcg tanya
    })


})

//Create a new Speaker //register speaker
module.exports.CreateSpeaker=(async(request,response,next)=>{

    try{
        const result=await speakerauthschema.validateAsync(request.body);  
        const doesexist=await Speaker.findOne({email:result.email})
        if (doesexist) 
            throw createError.Conflict(`${result.email} is already been registered!`);
        let spk=new Speaker(result);
        
            //save new student in database
            const savedspk=spk.save();
            const accessToken=await signAccessToken(savedspk.id);
            response.send(accessToken)
            .then((data)=>{
                response.status(201).json({message:"New Speaker Created ",data})
            })
            .catch(error=>next(error))

    }catch(error){
        if(error.isJoi=== true) error.status=422
        next(error)
    }
   
   

})


//speaker login
module.exports.LoginSpeaker=(async(request,response,next)=>{

    try{

       // const result=await speakerauthschema.validateAsync(request.body);
        const spk=await Speaker.findOne({email:request.body.email});


        if(!spk) throw createError.NotFound("Speaker is not Registered!");

        const isMatch=await spk.isValidpassword(request.body.password);
        if(!isMatch) throw createError.Unauthorized("UserName or Password is incorrect");

        const accessToken=await signAccessToken(spk.id);

        response.send({accessToken});
    }catch(error)
    {
        //if(error.isJoi===true) return next(createError.BadRequest("Invalid UserName or Password"))
        next(error);
    }
   

})


//Delete Speaker
module.exports.DeleteSpeaker=((request,response,error)=>{
    Speaker.deleteOne({email:request.body.email})
    .then(()=>{
        response.status(200).json({message:"Speaker Deleted"})
    })
    .catch(error=>{
        next(error)
    })
 

})