import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { Contact } from './db/models/contact.js';
import { isValidObjectId } from 'mongoose';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res, next) => {
    try {
      const data = await Contact.find();
      res.json({
        message: 'Successfully found contacts!',
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      if (!isValidObjectId(contactId)) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }
      const contact = await Contact.findById(contactId);

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
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      errorMessage: error.message,
      id: req.id,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
      status: 404,
    });
  });

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
