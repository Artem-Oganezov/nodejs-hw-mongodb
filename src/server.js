import express from 'express';
import pino from 'pino';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';
import js from '@eslint/js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.get('/', (req, res) => {
    res,
      js.json({
        message: 'Welcome to the API',
      });
  });
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `The requested resource ${req.originalUrl} does not exist.`,
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
