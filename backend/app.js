import express from "express"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"
const __dirname = path.resolve();
const app = express();//express ko call kardeya

import errorMiddleware from "./middleware/error.js"
// import fileUpload from "express-fileupload"
app.use(cors());
app.use(express.json());
app.use(cookieParser());//()bohot jaruri hai mt bhulna
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());

//Config
// dotenv.config({ path: "backend/config/config.env" });
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

// Route Imports
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"

import order from "./routes/orderRoute.js"
import  add from "./routes/addRoute.js"
import payment from "./routes/paymentRoute.js"

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", add);
app.use("/api/v1", payment);
//middleware 
// app.use(express.static(path.join(__dirname,"../frontend/build"))) //static file koo handle karne ke leye

// app.get('*',(req,res)=>{
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
// })
//concurently karke ek hai jisse hum ek hi commmand par both frontend and backend start kar sakte hai

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.use(errorMiddleware);
export default app;
