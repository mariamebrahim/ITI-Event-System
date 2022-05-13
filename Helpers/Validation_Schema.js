const joi=require('@hapi/joi');


const studauthschema=joi.object({
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(2).required(),

})

const speakerauthschema=joi.object({
    name:joi.string().required(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(2).required(),
    address:joi.required(),
    

})


module.exports={
    studauthschema,speakerauthschema
}