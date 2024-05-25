import express from 'express'

import {
    ForgotPasswordController,
    GetUserProfileController,
    Logincontroller,
    Registercontroller,
} from "../controllers/user.controller.js";
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post("/signup", Registercontroller);
router.post("/login", Logincontroller);
router.get("/getprofile", isAuthenticated, GetUserProfileController);
router.put("/forgotpassword", ForgotPasswordController);

export default router