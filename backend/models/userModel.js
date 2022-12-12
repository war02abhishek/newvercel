import mongoose from"mongoose"
import validator from"validator"
import bcrypt from"bcryptjs"
import jwt from"jsonwebtoken"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [30, "Name must be less than 30 characters"],
    minLength: [3, "Name must be at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [30, "Name must be less than 30 characters"],
    minLength: [3, "Name must be at least 3 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false, //admin jab details magega to passsword nahi dena
  },
  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  avatar : String,
  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//same mail id se register nahi karna
// hashed password ko phirse hash nahi karna
userSchema.pre("save",async function(next){

    if(!this.isModified())
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)

})

// JWT token
userSchema.methods.getJWTToken=function(){

  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
  })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){

  return await bcrypt.compare(enteredPassword, this.password); //ye enteredPassword and this.password ka order bohot jaruri hai
  
}


// Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Expire in 15 minutes
  
  // console.log(this.resetPasswordToken);
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  // console.log(this.resetPasswordExpire);

  return resetToken;
};



var ProdD = mongoose.model("User", userSchema);

export default ProdD;

