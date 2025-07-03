import createHttpError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Body is required.');
  }

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((err) => err.message).join('; ');
    throw createHttpError(400, messages);
  }
  next();
};
