import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }

}, { versionKey: false, timestamps: true })

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);

export const signupSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const signinSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const updateSubscribeSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})


const User = model("user", userSchema);

export default User;