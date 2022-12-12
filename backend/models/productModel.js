import mongoose from "mongoose";

const productSchema=new mongoose.Schema({

    name:{
        type: String,
        required:[true,"Product Name is required"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"Price cannot excedd 8 char"],
    },
    ratings:{
        type:Number,
        default:0,
    },
    image:[{
        public_id:{
            type:String,
            required:true,
        },
         url:{
            type:String,
            required:true,
        }
    }],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],

    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot excedd 4 characters"],
        default:1,
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],

    //jo product banayega usko sav karna hai uske object Id ko
    user:{
        type:mongoose.Schema.ObjectId,
        res:"user",
        required:true,

    },

    createdAt:{
        type:Date,
        default:Date.now
    }
     


})

var ProdD=mongoose.model("Product",productSchema);

export default ProdD;