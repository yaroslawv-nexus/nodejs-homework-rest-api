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
  try {
    const originalImage  = await Jimp.read(oldPath);
    const resizedImage = originalImage.clone().resize(250, 250);
    await resizedImage.writeAsync(oldPath);
    
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);

    const updateUser = await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      email: updateUser.avatarURL
    })
  } catch (e) {
    res.status(500).json({ error: 'Помилка при оновленні аватара' });
  }
    
}

export default {
    updateSubscribe: tryCatchWrapper(updateSubscribe),
    updateAvatar: tryCatchWrapper(updateAvatar),
}