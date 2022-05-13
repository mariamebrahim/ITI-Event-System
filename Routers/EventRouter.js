
const express=require("express");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();
const Controller=require("../Controllers/EventController");

const{body,param,query}=require("express-validator");

//router.use(authMW);
router.route("/event")

.get(Controller.getAllEvents)
.post(Controller.CreateEvent)

.put(Controller.UpdateEvent)
.delete(Controller.DeleteEvent)


module.exports=router;