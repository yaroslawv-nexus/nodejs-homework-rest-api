import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { HttpError } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";
import User from "../../models/User.js";


const avatarsPath = path.resolve("public", "avatars");

const updateSubscribe = async (req, res) => {
    const { _id } = req.user;
    const updateUser = await User.findByIdAndUpdate(_id, req.body);
    res.json({   
        email: updateUser.email,  
     subscription: updateUser.subscription   
    })
}

const updateAvatar = async (req, res) => {
 
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const img = await Jimp.read(oldPath)
  .then((lenna) => {
    return lenna
      .resize(250, 250) // resize
  })
  .catch((err) => {
    console.error(err);
  });
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);
    const updateUser = await User.findByIdAndUpdate(_id, {avatarURL});
    res.status(200).json({   
        email: updateUser.avatarURL   
    })
    
}

export default {
    updateSubscribe: tryCatchWrapper(updateSubscribe),
    updateAvatar: tryCatchWrapper(updateAvatar),
}