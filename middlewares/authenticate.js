import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js"
import User from "../models/User.js";
import "dotenv/config.js";

import tryCatchWrapper from "../decorators/tryCatchWrapper.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
         throw HttpError(401);
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer != "Bearer") {
        throw HttpError(401);
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            throw HttpError(401, "user not found");
        }
        req.user = user;
        next();
    }
    catch(e) {
        throw HttpError(401, e.message);
    }

}

export default tryCatchWrapper(authenticate);