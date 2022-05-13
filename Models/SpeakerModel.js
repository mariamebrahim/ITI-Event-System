const mongoose=require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const bcrypt=require("bcrypt");



//1-Create Schema
let Speakerschema=new mongoose.Schema({
   // _id:mongoose.Types.ObjectId,
    name:{type:String,required:true},
    email: {type:String,required:true,unique:true},
    password:{type:String,required:true},
    address: {
        building: Number,
        street: {type:String,required:true},
        city: {type:String,required:true},
    },
    Events:[{ type: Number, ref: 'Event' }]
})

Speakerschema.pre('save',async function(next){

    try{

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(this.password,salt);
        this.password=hashedpassword;
        next();

        console.log("Called before saving a user");

    }catch{
        next(error);
    }

})


//2-Bind this schema(Table design) to specified database
module.exports=mongoose.model("Speaker",Speakerschema);


