import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";
import "dotenv/config.js";



const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) { 
        throw HttpError(409, "Email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw HttpError(409, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
       throw HttpError(409, "Email or password invalid"); 
    }

    const payload = {
        id: user._id,
    }

    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    
    
    res.json({
        token,
    })
}


export default {
    signup: tryCatchWrapper(signup),
    signin: tryCatchWrapper(signin),
}