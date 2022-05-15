const mongoose=require("mongoose");
const Schema = mongoose.Schema;

//1-Create Schema
let Eventschema=new mongoose.Schema({
    Title: {type:String,required:true},
    EventDate :{type:Date,required:true},
    MainSpeaker:{ type:String, ref: 'Speaker',unique:true},
    Speakers: [{ type:String, ref: 'Speaker' ,unique:true}],
    Students: [{ type:String, ref: 'Student',unique:true }],
})

//2-Bind this schema(Table design) to specified database
module.exports=mongoose.model("Event",Eventschema)