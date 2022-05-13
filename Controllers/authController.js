//authentication:Are you logged in before?
//authorization:Do you Have Access to log in

//token is made in server and is sent by response

const jwt=require('jsonwebtoken');

const createErrors=require('http-errors');
const { promise, reject } = require('bcrypt/promises');

module.exports={
    signAccessToken:(userId)=>{

        return new promise((resolve,reject)=>{

            const payload={
                name:"Yours Truly"
            }

            const secret="Yours Super Secret"
            const options={}

            jwt.sign(payload,secret,options,(err,token)=>{
                if (err) reject(err)
                resolve (token)
            })
           
        } )


    }
}



// module.exports.login=(request,response,next)=>{

//     //connect on DB to see if this data mawgoda wala la2
//     let token;
//     if(request.body.email=='mariam@gmail.com' && request.body.password=='123')
//     {
//        token= jwt.sign({_id:1,
//             email:request.body.email,
//             role:"admin"},
//             "IamanAdmin",
//             {expiresIn:"1h"}
//         );
//        // response.status(200).json({message:"Event is Updated",data})
//         response.status(201).json({message:"You are already Signed in!"});
//     }else{
//         next(new Error("UserName or Password is in Correct"));
//     }

   

// }