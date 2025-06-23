import { TYPES } from '../constants/index.js';
import { FAVOURITES } from '../constants/index.js';

const parseType = (contactType) => {
  if (!contactType || !TYPES.includes(contactType)) return undefined;
  return contactType;
};
const parseIsFavourite = (isFavourite) => {
  if (!isFavourite || !FAVOURITES.includes(isFavourite)) return undefined;
  return isFavourite === 'true';
};
export const parseFilterParams = (query) => {
  const type = parseType(query.type);
  const isFavourite = parseIsFavourite(query.isFavourite);
  return { type, isFavourite };
};
