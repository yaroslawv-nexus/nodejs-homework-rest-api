import express from "express";
import usersController from "../../controllers/contacts/users-controller.js";
import { isEmptyBody, authenticate, upload } from '../../middlewares/index.js';
import validateWrapper from '../../decorators/validateWrapper.js';
import { updateSubscribeSchema } from "../../models/User.js";



const usersRouter = express.Router();

usersRouter.use(authenticate);

usersRouter.patch('/', isEmptyBody, validateWrapper(updateSubscribeSchema), usersController.updateSubscribe);
usersRouter.patch('/avatars', upload.single("avatar"), usersController.updateAvatar);

export default usersRouter;