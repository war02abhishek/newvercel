import express from "express"

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts
} from "../controllers/ProductController.js";
import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";

const router = express.Router();

//update deletecreate product require admin acess

router.get(
  "/products",
  getAllProducts
);//search,filter,products
router.get(
  "/admin/products",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  getAdminProducts
);

router.post(
  "/product/new",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
 
  createProduct
);
router.put(
  "/product/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  updateProduct
);
router.delete(
  "/product/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  deleteProduct
);
router.get("/product/:id", getProduct);

router.put("/review", isAuthenticatedUser,createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/review", isAuthenticatedUser,AuthenticatedRole("admin"),deleteProductReview)


export default router;