import { HttpError } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";
import User from "../../models/User.js";


const updateSubscribe = async (req, res) => {
    const { _id } = req.user;
    const updateUser = await User.findByIdAndUpdate(_id, req.body);
    res.json({   
        email: updateUser.email,  
     subscription: updateUser.subscription   
    })
}

export default {
    updateSubscribe: tryCatchWrapper(updateSubscribe),
}