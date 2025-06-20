import { Router } from 'express';
import {
  addContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', getContactsController);

contactsRouter.get('/contacts/:contactId', getContactByIdController);

contactsRouter.post('/contacts', addContactController);

contactsRouter.patch('/contacts/:contactId', updateContactController);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;
