import { isValidObjectId } from 'mongoose';
import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const data = await getAllContacts();
    res.json({
      message: 'Successfully found contacts!',
      status: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
        status: 404,
      });
    }

    res.json({
      message: `Successfully found contact with id ${contactId}!`,
      status: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);
  return res.status(201).json({
    message: 'Successfully added contact!',
    status: 201,
    data: newContact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  return res.status(200).json({
    message: `Successfully updated contact with id ${contactId}!`,
    status: 200,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  await deleteContact(contactId);
  res.status(204).send();
};
