import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { HttpError, sendEmail } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";
import User from "../../models/User.js";
import "dotenv/config.js";


const avatarsPath = path.resolve("public", "avatars");

const { BASE_URL } = process.env;

const updateSubscribe = async (req, res) => {
    const { _id } = req.user;
    const updateUser = await User.findByIdAndUpdate(_id, req.body);
    res.json({   
        email: updateUser.email,  
     subscription: updateUser.subscription   
    })
}

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Image undefined");
  }

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
      avatarURL: updateUser.avatarURL
    })
  } catch (e) {
    res.status(500).json({ error: 'Помилка при оновленні аватара' });
  }
    
}

const verify = async (req, res) => { 
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log(user);
  if (!user) {
    throw HttpError(401, "Email not found")
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "null" });

  res.json({
   message: "Email verify success",
  });
}

const sendVerify = async (req, res) => { 
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found")
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed")
  }

  const { verificationToken } = user;

  const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
    }

  await sendEmail(verifyEmail);

  res.json({
   message: "Email send success",
  });
}

export default {
    updateSubscribe: tryCatchWrapper(updateSubscribe),
  updateAvatar: tryCatchWrapper(updateAvatar),
  verify: tryCatchWrapper(verify),
    sendVerify: tryCatchWrapper(sendVerify),
}