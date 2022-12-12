import ErrorHandler from '../utils/ErrorHandler.js'

 
// const errorM = (err, req,res,next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   res.status(err.statusCode).json({
//     sucess: false,
//     error: err,
//   });
// };
// export default errorM;


const errorMiddleware=(err,req, res, next)=>{
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

//wrong Mongo Db id error
if(err.name==='CastError'){
//
  const message=`Resource not found.Invalid : ${err.path}`;
  err=new ErrorHandler(message,400);

}





  res.status(err.statusCode).json({
    sucess: false,
    // error: err.stack, //all details of error
    message:err.message
  });

}

export default errorMiddleware;