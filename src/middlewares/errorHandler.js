import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';


export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
      data: error.data,
    });
  }
  if (error instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Database error occurred',
      data: error.message,
    });
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
