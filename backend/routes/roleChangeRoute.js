import express from "express";
import isAuth from "../middleware/authMiddleware.js";
import { updateRole } from "../controllers/roleController.js";

const rolerouter = express.Router()

rolerouter.route('/roleUpdate').patch(isAuth,updateRole);

export default rolerouter