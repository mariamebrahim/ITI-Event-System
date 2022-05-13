const express=require("express");
const body_parser=require("body-parser");
const mongoose=require("mongoose");
const morgan=require('morgan');
const createError=require('http-errors');



const authRouter=require("./Routers/authRouter");
const studentrouter=require("./Routers/StudentRouter");
const speakerrouter=require("./Routers/SpeakerRouter");
const AdminEventRouter=require("./Routers/EventRouter");
const AdminStudentrouter=require("./Routers/AdminStudentRouter");
const AdminSpeakerrouter=require("./Routers/AdminSpeakerRouter");
const { append } = require("express/lib/response");


//1-Create Server
const server=express();
server.use(express.json())
server.use(express.urlencoded({extended:true}))


//connection string to DB
mongoose.connect("mongodb://localhost:27017/ITIEventSystem").then(()=>{
    console.log("Db Connected");
    //2-Listen on Port Number when db is connected
    server.listen(process.env.port||8081,()=>{
    console.log("server is listening");
})
}).catch(error=>console.log("DB Connection Problem"))



//Middlewares & Routes

//Middleware for logging
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();

})

//Routes
//1- home using get method
server.get("/home",(request,response,next)=>{
    response.send("You are in Home Page");

})

//body parser middlewares in router as not to call them every time i make post or delete or put(used in any router file)

server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

//2-Department Router


server.use('/auth',authRouter);
server.use(studentrouter);
server.use(speakerrouter);
server.use(AdminStudentrouter);
server.use(AdminSpeakerrouter);
server.use(AdminEventRouter);



//Not Found Middleware
server.use((request,respone,next)=>{
    // response.send("Not Found!");
    response.status(404).json({message:"Page is Not Found!"});
}
)



//Error MW
server.use((error,request,response,next)=>{
    // response.send(error+"");
    response.status(500).json({message:error+""});//Internal Error
});




