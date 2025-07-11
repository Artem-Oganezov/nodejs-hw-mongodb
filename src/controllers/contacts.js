import { isValidObjectId } from 'mongoose';
import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
  uploadContactsPhoto,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts(req.user._id, {
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    message: 'Successfully found contacts!',
    status: 200,
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await getContactById(req.user._id, contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    message: `Successfully found contact with id ${contactId}!`,
    status: 200,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const newContact = await addContact({ userId: req.user._id, ...req.body });
  return res.status(201).json({
    message: 'Successfully added contact!',
    status: 201,
    data: newContact,
  });
};

export const uploadContactsPhotoController = async (req, res) => {
  const { contactId } = req.params;
  if (!req.file) {
    throw createHttpError(400, 'File not found!');
  }
  const contact = await uploadContactsPhoto(req.user._id, contactId, req.file);

  return res.json({
    message: `Successfully updated contacts avatar with id ${contactId}!`,
    status: 200,
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, {
    userId: req.user._id,
    ...req.body,
  });
  return res.status(200).json({
    message: `Successfully updated contact with id ${contactId}!`,
    status: 200,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  await deleteContact(req.user._id, contactId);
  res.status(204).send();
};
