import express from  'express';

const router =express.Router();
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder

} from "../controllers/OrderController.js"

import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/orders/me", isAuthenticatedUser, myOrders);

router.get(
  "/admin/orders",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  getAllOrders
);

router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  updateOrderStatus
);

router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  deleteOrder
);

export default router;