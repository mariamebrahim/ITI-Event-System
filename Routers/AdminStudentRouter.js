
const express=require("express");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();
const Controller=require("../Controllers/StudentController");

const{body,param,query}=require("express-validator");

//router.use(authMW);
router.route("/adminstudent")

.get(Controller.getAllStudents)
.put(Controller.AdminUpdateStudent)
.delete(Controller.DeleteStudent)


module.exports=router;