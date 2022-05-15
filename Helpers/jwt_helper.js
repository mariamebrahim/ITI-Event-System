const jwt=require('jsonwebtoken');
const createerror=require('http-errors');



module.exports={
    signAccessToken : (userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={};
            const secret='secretkey';
            const options={
                expiresIn:"1h",
            
            };
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err) {
                    //reject(err);
                    console.log(err.message);
                    reject(createerror.InternalServerError());
                }
                resolve(token);

            })}
        )
    }

    }
