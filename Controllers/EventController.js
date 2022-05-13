const Event=require("./../Models/EventModel");
const Student=require("./../Models/StudentModel");
const Speaker=require("./../Models/SpeakerModel");






//get all Events data
module.exports.getAllEvents=((request,response,next)=>{
    Event.find().populate({path:'Students'})
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



//Create a new Event
module.exports.CreateEvent=((request,response,next)=>{

    let event=new Event({
        _id:request.body.id,
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


