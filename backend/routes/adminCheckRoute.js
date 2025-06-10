import express from "express";
import isAuth from "../middleware/authMiddleware.js";
import { checkAdmin } from "../controllers/authController.js";

const adminrouter = express.Router()

adminrouter.route('/me').get(isAuth,checkAdmin);

export default adminrouter