
const express=require("express");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();
const Controller=require("../Controllers/SpeakerController");

const{body,param,query}=require("express-validator");

//router.use(authMW);
router.route("/adminspeaker")

.get(Controller.getAllSpeakers)
.put(Controller.AdminUpdateSpeaker)
.delete(Controller.DeleteSpeaker)


module.exports=router;