import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

const isValidId = async (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        return next(HttpError(404, `${contactId} is not valid`))
    }
    next();
}

export default isValidId;