//create token and saving in cookie
//created token has to be send in cookie so that it get in frontend

const sendToken=(user,statusCode,res)=>{

     const token = user.getJWTToken();

     //options for cookies
     const options = {
       expires: Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,  //converting 5d in millisec
       httpOnly: false,
     };


     res.status(statusCode).cookie("token",token,options).json({

        sucess: true,
        message: "Token sent!",
        user,
        token,
     })



}
export default sendToken;