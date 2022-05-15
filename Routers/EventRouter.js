
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

router.put('/assignspeaker',Controller.AssignSpeakerToEvent)
router.put('/assignstud',Controller.AssignStudentToEvent)
router.put('/assignMainspeaker',Controller.AssignMainSpeakerToEvent)


router.post('/admin/login',Controller.LoginAdmin)



module.exports=router;