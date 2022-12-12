import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Stripe from "stripe"
const stripe = new Stripe(
  "sk_test_51Kpv6vSBDb6ISOz8lzJyujjA9Z4PLyGNZiCM4KE06MVqWQCdmVMeyBKDFbVwIH7MZuP64PGQuX2qlMqKzEhiDL8Q00BrbiyGj7"
);


export  const processPayment = async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//main use of API_KEY is in front end but we kept it in config so that we can change in future and its secure so no issue
export const sendStripeApiKey =(async (req, res, next) => {

  try {
     res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    
  } catch (error) {
       res.status(404).json({ message: error.message });
  }

 
});