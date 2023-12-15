import express from "express";
import authController from "../../controllers/contacts/auth-controller.js";
import usersController from "../../controllers/contacts/users-controller.js";
import { isEmptyBody, authenticate, upload } from '../../middlewares/index.js';
import validateWrapper from '../../decorators/validateWrapper.js';
import { signinSchema, signupSchema } from "../../models/User.js";
import { updateSubscribeSchema } from "../../models/User.js";




const userRouter = express.Router();

userRouter.post("/register", isEmptyBody, validateWrapper(signupSchema), authController.signup);

userRouter.post("/login", isEmptyBody, validateWrapper(signinSchema), authController.signin);

userRouter.post("/logout", authenticate, authController.signout);

userRouter.get("/current", authenticate, authController.getCurrent);

userRouter.patch('/', authenticate, isEmptyBody, validateWrapper(updateSubscribeSchema), usersController.updateSubscribe);

userRouter.patch('/avatars', authenticate, upload.single("avatar"), usersController.updateAvatar);

export default userRouter;