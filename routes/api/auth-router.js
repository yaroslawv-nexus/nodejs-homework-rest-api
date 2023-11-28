import express from "express";
import authController from "../../controllers/contacts/auth-controller.js";
import { isEmptyBody } from '../../middlewares/index.js';
import validateWrapper from '../../decorators/validateWrapper.js';
import { signinSchema, signupSchema } from "../../models/User.js";



const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody , validateWrapper(signupSchema), authController.signup);
authRouter.post("/signin", isEmptyBody , validateWrapper(signinSchema), authController.signin);

export default authRouter;