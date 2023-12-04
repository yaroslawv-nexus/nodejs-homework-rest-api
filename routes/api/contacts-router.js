import express from 'express'
import contactsController from '../../controllers/contacts/contacts-controller.js';
import {isEmptyBody, isValidId, authenticate, upload} from '../../middlewares/index.js';
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../models/Contact.js';
import validateWrapper from '../../decorators/validateWrapper.js';



const contactsRouter = express.Router()
 
contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', isValidId, contactsController.getContactById);

// якщо деккілька файлів в 1 полі upload.array("avatar", 8);
// файли в різних полях upload.fields([{name: "avatar", maxCount: 1}]);
contactsRouter.post('/', upload.single("avatar") , isEmptyBody,validateWrapper(contactAddSchema), contactsController.addContact);

contactsRouter.put('/:contactId', isValidId, isEmptyBody, validateWrapper(contactUpdateSchema), contactsController.updateContactById);

contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBody, validateWrapper(contactFavoriteSchema), contactsController.updateContactById);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteContactById);






export default contactsRouter;