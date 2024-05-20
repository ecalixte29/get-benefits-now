import { Router } from "express";
import { getUser, login, register } from "../controllers/auth.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const AuthRouter = Router();

AuthRouter
    .post("/login", login)
    .post("/register", register)
    .get("/user", AuthMiddleware, getUser)

export default AuthRouter