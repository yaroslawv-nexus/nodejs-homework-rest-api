
import { HttpError } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";
import Contact from "../../models/Contact.js";





const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...filters } = req.query;
  const filter = {owner, ...filters}

  const skip = (page - 1) * limit;
  const result = await Contact.find(filter, "-createdAt -updatedAt", {skip , limit}).populate("owner", "email subscription");
  res.json(result);      
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
     const result = await Contact.findOne({_id: contactId, owner});
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
    res.json(result);
}

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
}

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json(result);

}

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({_id: contactId, owner});
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
    res.status(204).send();
 
}

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json(result);
 
}


export default {
  getAllContacts: tryCatchWrapper(getAllContacts),
  getContactById: tryCatchWrapper(getContactById),
  addContact: tryCatchWrapper(addContact),
  updateContactById: tryCatchWrapper(updateContactById),
  deleteContactById: tryCatchWrapper(deleteContactById),
  updateFavorite: tryCatchWrapper(updateFavorite)
}