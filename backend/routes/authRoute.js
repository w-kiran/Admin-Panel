import express from "express";
import { getAllUsers, getMe, login, logout, register } from "../controllers/authController.js";
import isAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getAllUsers').get(getAllUsers);
router.route('/getMe').get(isAuth,getMe);

export default router