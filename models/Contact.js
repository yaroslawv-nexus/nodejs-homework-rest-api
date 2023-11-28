import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
  },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    }, 
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);
contactSchema.pre("findOneAndUpdate", preUpdate);

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

export const contactUpdateSchema  = Joi.object(
{
  name: Joi.string(),
  email: Joi.string().email(),
    phone: Joi.string(),
  favorite: Joi.boolean()
}
);

export const contactFavoriteSchema  = Joi.object(
{
    favorite: Joi.boolean().required()
}
);


const Contact = model("contact", contactSchema);

export default Contact;