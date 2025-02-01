import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
  handleRefreshToken,
  logout,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);
userRouter.put("/update-user", authMiddleware, updateUser);
userRouter.delete("/delete-user", authMiddleware, deleteUser);
userRouter.get("/refreshToken", handleRefreshToken);
userRouter.get("/logout", logout);

export default userRouter;
