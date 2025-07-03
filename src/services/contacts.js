import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  contactUserId,
  { page, perPage, sortBy, sortOrder, filter },
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId: contactUserId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await Contact.find({ userId: contactUserId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactUserId, contactId) => {
  return await Contact.findOne({ _id: contactId, userId: contactUserId });
};

export const addContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (contactId, contactData) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId: contactData.userId },
    contactData,
    {
      new: true,
    },
  );
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const deleteContact = async (contactUserId, contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId: contactUserId,
  });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};
