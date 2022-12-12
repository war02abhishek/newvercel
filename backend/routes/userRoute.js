import express from 'express';
import {
  registerUser,
  loginUser,
  googleloginUser,
  logoutUser,
  forgotPassword,
  updatePassword,
  getUserDetails,
  updateProfile,
  getAllUser,
  deleteUser,
  updateUserRole,
  getSingleUser,
} from "../controllers/UserController.js";
import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";
const router = express.Router();

router.post("/register",registerUser);
router.post("/googlelogin", googleloginUser);

router.post("/login", loginUser);
router.post("/password/forgot",forgotPassword);
router.get("/logout", logoutUser);
router.get("/me",isAuthenticatedUser, getUserDetails);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.put("/password/update",isAuthenticatedUser,updatePassword)

router.get("/admin/users", isAuthenticatedUser, AuthenticatedRole("admin"), getAllUser);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  getSingleUser
);

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  updateUserRole
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  AuthenticatedRole("admin"),
  deleteUser
);




export default router;