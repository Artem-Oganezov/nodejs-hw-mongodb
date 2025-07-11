import { Router } from 'express';
import {
  addContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
  uploadContactsPhotoController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/uploadPhoto.js';

const contactsRouter = Router();

contactsRouter.use('/contacts', authenticate);

contactsRouter.use('/contacts/:contactId', isValidId);

contactsRouter.get('/contacts', getContactsController);

contactsRouter.get('/contacts/:contactId', getContactByIdController);
contactsRouter.patch(
  '/contacts/:contactId/uploadPhoto',
  upload.single('photoUrl'),
  uploadContactsPhotoController,
);
contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  addContactController,
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  updateContactController,
);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;
