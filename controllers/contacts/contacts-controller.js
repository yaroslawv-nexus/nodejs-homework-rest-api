
import { HttpError } from "../../helpers/index.js"
import tryCatchWrapper from "../../decorators/tryCatchWrapper.js";
import Contact from "../../models/Contact.js";





const getAllContacts = async (req, res, next) => {
        const result = await Contact.find();
        res.json(result);
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
    res.json(result);
}

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const updateContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json(result);

}

const deleteContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
    res.status(204).send();
 
}

const updateFavorite = async (req, res, next) => {
   const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
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