const mongoose=require("mongoose");

//1-Create Schema
let Adminschema=new mongoose.Schema({
    email:"mariam@gmail.com",
    password:"123"
})

//2-Bind this schema(Table design) to specified database
module.exports=mongoose.model("Admin",Adminschema)