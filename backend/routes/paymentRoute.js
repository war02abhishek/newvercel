import express from "express";

const router = express.Router();
import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/PaymentController.js";

router.post("/payment/process", isAuthenticatedUser,processPayment);
router.get("/stripeapikey", isAuthenticatedUser,sendStripeApiKey);


export default router;