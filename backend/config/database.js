import mongoose from "mongoose";
import dotenv from "dotenv"

// "mongodb://localhost:27017/Ecommerce"

// CONNECTION_URL=mongodb+srv://e-commercewar.9vncj35.mongodb.net/myFirstDatabase" --apiVersion 1 --username war_abhishek
const connectDatabase=()=>{

  mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true})
  .then((data)=>{console.log(`mongo db connected with server ${data.connection.host}`)})
  
  
}

export default connectDatabase;