import express from "express";
import usersController from "../../controllers/contacts/users-controller.js";
import { isEmptyBody, authenticate } from '../../middlewares/index.js';
import validateWrapper from '../../decorators/validateWrapper.js';
import { updateSubscribeSchema } from "../../models/User.js";



const usersRouter = express.Router();

usersRouter.patch('/', authenticate, isEmptyBody, validateWrapper(updateSubscribeSchema), usersController.updateSubscribe);

export default usersRouter;