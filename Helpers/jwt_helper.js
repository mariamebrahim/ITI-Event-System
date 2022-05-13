const jwt=require('jsonwebtoken');
const createerror=require('http-errors');


module.exports={
    signAccessToken : (userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={};
            const secret="secret key";
            const options={
                expiresIn:"1h",
                issuer:"pickuerpage.com",
                audience:userId
            };
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err) reject(err);
                resolve(token);

            })}
        )
    }
}