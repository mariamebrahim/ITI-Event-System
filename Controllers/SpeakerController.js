const Speaker=require("./../Models/SpeakerModel");



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

//Create a new Speaker
module.exports.CreateSpeaker=((request,response,next)=>{

    let spk=new Speaker({
        name:request.body.name,
        email: request.body.email,
        password:request.body.password,
        address:request.body.address
    })

    //save new speaker in database
    spk.save()
    .then((data)=>{
        response.status(201).json({message:"New Speaker Created "+data})

    })
    .catch(error=>next(error))
   

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