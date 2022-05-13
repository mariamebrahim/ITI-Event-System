
const express=require("express");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();

const Controller=require("./../Controllers/StudentController");

const{body,param,query}=require("express-validator");

//router.use(authMW);
router.route("/student")
.post(Controller.CreateStudent)
.get(Controller.getAllStdEvents)
.put(Controller.UpdateStudent)


module.exports=router;