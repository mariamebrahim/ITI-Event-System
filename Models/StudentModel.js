const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

//1-Create Schema
let Studentschema=new mongoose.Schema({
    _id:Number,
    email: {type:String,required:true,unique:true},
    password:{type:String,required:true},
    Events:[{ type: Number, ref: 'Event',unique:true}]
})

//2-Bind this schema(Table design) to specified database
module.exports=mongoose.model("Student",Studentschema);

Studentschema.pre('save',async function(next){

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