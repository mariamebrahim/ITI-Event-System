
const express=require("express");

//const authMW=require("./../Middlewares/Auth.Middleware");
const router=express.Router();

const Controller=require("./../Controllers/SpeakerController");

const{body,param,query}=require("express-validator");

//router.use(authMW);
router.route("/speaker")
.post(Controller.CreateSpeaker)
.get(Controller.getAllSpeakerEvents)
.put(Controller.UpdateSpeaker)
router.post('/speaker/login',Controller.LoginSpeaker)


module.exports=router;