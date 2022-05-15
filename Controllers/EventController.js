const Event=require("./../Models/EventModel");
const createError=require("http-errors");

const Student=require("./../Models/StudentModel");
const Speaker=require("./../Models/SpeakerModel");






//get all Events data
module.exports.getAllEvents=((request,response,next)=>{
    Event.find({_id:request.body.id}).populate({path:'Students'})
    .then((data)=>{
        response.status(200).json({data})

    }).catch(error=>{next(error)})

})



//Admin Update Event
module.exports.UpdateEvent=((request,response,next)=>{
    Event.updateOne({_id:request.body.id},{
        $set:{
            Title:request.body.Title,
            EventDate:request.body.EventDate,
            MainSpeaker:request.body.MainSpeaker   
        }, $push:{Students:request.body.Students,Speakers:request.body.Speakers}
      
        
    }).then((data)=>{
        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Event is Updated",data})

    })
    .catch(error=>next(error))
})


//Assign Student To Event
module.exports.AssignStudentToEvent=((request,response,next)=>{
    Event.updateOne({_id:request.body.id},{
      
        $push:{Students:request.body.email}  
         
    }).then((data)=>{
        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Student is Assigned",data})

    })
    .catch(error=>next(error))
    Student.updateOne({email:request.body.email},{
        $push:{Events:request.body.id} 
    }).then((data)=>{
      

        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Event is Assigned To Student",data})

    })
    .catch(error=>next(error))
})


//Assign Speakers To Event
module.exports.AssignSpeakerToEvent=((request,response,next)=>{
    Event.updateOne({Title:request.body.Title},{
      
        $push:{Speakers:request.body.email}  
         
    }).then((data)=>{
        console.log(data)
        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Speaker is Assigned",data})

    })
    .catch(error=>next(error))
    Speaker.updateOne({email:request.body.email},{
        $push:{Events:request.body.Title} 
    }).then((data)=>{
      

        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Event is Assigned To Student",data})

    })
    .catch(error=>next(error))
})


//Assign Speakers To Event
module.exports.AssignMainSpeakerToEvent=((request,response,next)=>{
    Event.updateOne({Title:request.body.Title},{
      
        MainSpeaker:request.body.email
         
    }).then((data)=>{
        console.log(data)
        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Main Speaker is Assigned",data})

    })
    .catch(error=>next(error))
    Speaker.updateOne({email:request.body.email},{
        $push:{Events:request.body.Title} 
    }).then((data)=>{
      

        if(data.matchedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Event is Assigned To Student",data})

    })
    .catch(error=>next(error))
})

   



//Create a new Event
module.exports.CreateEvent=((request,response,next)=>{

    let event=new Event({
        Title:request.body.Title,
        EventDate:request.body.EventDate
    })

    //save new Event in database
    event.save()
    .then((data)=>{
        response.status(201).json({message:"New Event Created ",data})

    })
    .catch(error=>next(error))
   

})




//Delete Event
module.exports.DeleteEvent=((request,response,next)=>{
    Event.deleteOne({Title:request.body.Title})
    .then((data)=>{
        if(data.deletedCount==0)
            throw new Error("Event doesn't exist");
        response.status(200).json({message:"Event Deleted"})
    })
    .catch(error=>{
        next(error)
    })
})


//Admin login
module.exports.LoginAdmin=(async(request,response,next)=>{

    try{

        if(request.body.email!="mariam@gmail.com" || request.body.password!="123") 
                throw createError.NotFound("You are not an Admin!");
        else{
            response.send("Welcome Admin");

        }
   


    }catch(error)
    {
        
        next(error);
    }
   

})


