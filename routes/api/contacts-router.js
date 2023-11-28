import express from 'express'
import contactsController from '../../controllers/contacts/contacts-controller.js';
import {isEmptyBody, isValidId} from '../../middlewares/index.js';
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../models/Contact.js';
import validateWrapper from '../../decorators/validateWrapper.js';


 const router = express.Router()

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', isValidId, contactsController.getContactById);

router.post('/', isEmptyBody,validateWrapper(contactAddSchema), contactsController.addContact);

router.put('/:contactId', isValidId, isEmptyBody, validateWrapper(contactUpdateSchema), contactsController.updateContactById);

router.patch('/:contactId/favorite', isValidId, isEmptyBody, validateWrapper(contactFavoriteSchema), contactsController.updateContactById);

router.delete('/:contactId', isValidId, contactsController.deleteContactById);






export default router;