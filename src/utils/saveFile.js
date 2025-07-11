import createHttpError from 'http-errors';
import { cloudinary } from './cloudinary.js';
import fs from 'node:fs/promises';

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      folder: 'avatar',
    });
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (err) {
    throw createHttpError(500, `Cloudinary err: ${err.message}`);
  }
};
