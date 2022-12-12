// exports.getAllProducts=(req,res)=>{
//     res.status(200).json({message:"Route is working fine"})
// }
import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Product from "../models/productModel.js"
import ErrorHandler from "../utils/ErrorHandler.js";
// import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../routes/apiFeatures.js";

//CREATE PRODUCT --BY ADMIN
export const createProduct = async (req, res, next) => {

  try {

    console.log(req.body);
    req.body.user = req.user.id;
    const product = await Product.create(req.body);//requesting database to create 

    res.status(201).json({
      sucess: true,
      product,
    })
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res,next) => {

  try {
  //  return  next(new ErrorHandler('temp error',404)); //alert cecking
  console.log('get all product backend controller')
    const resultPerPage = 12;
    const productsCount=await Product.countDocuments();
    console.log(req.query);
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage); //you can use req.query.keyword here or inside ApiFeatures class

    const Products = await apiFeatures.query.clone();
    // const products = await Product.find({name:samosa});
    // const products = await Product.find();
    let filteredProductsCount = Products.length;
console.log(Products);
    res.status(200).json({
      sucess: true,
      Products,
      resultPerPage,
      productsCount,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}


//UPDATE PRODUCT --BY ADMIN
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      // res.status(500).json({
      //   sucess: true,
      //   message:"Product Not Found"
      // })
      return next(new ErrorHandler("product not found", 404));
    }

    console.log(req.params.id)
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({
      sucess: true,
      product
    })



  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//DELETE PRODUCT --BY ADMIN
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      // res.status(500).json({
      //   sucess: true,
      //   message: "Product Not Found",
      // });
      return next(new ErrorHandler("product not found", 404));
    }
    await Product.findByIdAndRemove(req.params.id);
    // await product.remove();

    res.status(200).json({
      sucess: true,
      message: "Product Deleted Sucessfully",
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




//get single product details
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      // res.status(500).json({
      //   sucess: true,
      //   message: "Product Not Found",
      // });
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      sucess: true,
      product,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// //create new review or update existing one
export const createProductReview = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.user._id.toString());
   
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.firstName,  //user is jo product banayega
      rating: Number(rating),
      comment: comment,

    }
 
    console.log(productId);
   const product = await Product.findById(productId);
console.log(product);
    const isReviewed = product.reviews.find(
      (rev) => rev._id.toString() === req.user._id.toString()
       
      //yaha dikkkat
    );

    if (isReviewed) {
      //iterate all reviews and find by user id
      product.reviews.forEach((rev) => {
        console.log(rev.user.toString());
        if (rev.user.toString() === req.body.user._id.toString()) {
          rev.rating = Number(rating);
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Review created successfully",
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



//get all reviews of a product
export const getProductReviews = async (req, res, next) => {
  try {
      const product = await Product.findById(req.query.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        reviews: product.reviews,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete a review and update rating --by admin
export const deleteProductReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

     if (!product) {
       return next(new ErrorHandler("Product not found", 404));
     }
      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query._id.toString()
      );

   
        let avg = 0;

        reviews.forEach((rev) => {
          avg += rev.rating;
        });

        let ratings = 0;

        if (reviews.length === 0) {
          ratings = 0;
        } else {
          ratings = avg / reviews.length;
        }
        const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

    res.status(200).json({
      sucess: true,
      message: "Product Review Deleted and rating updated Sucessfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get All Product (Admin)
export const getAdminProducts = (async (req, res, next) => {
  try {
     const products = await Product.find();

     res.status(200).json({
       success: true,
       products,
     });
  } catch (error) {
        res.status(404).json({ message: error.message });
  }
 
});