import express from "express";

const router = express.Router();
import { addCart } from "../controllers/AddCartController.js";

import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";

router.post("/add/addcart", isAuthenticatedUser, addCart);

export default router;