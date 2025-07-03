import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUser.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserValidationSchema } from '../validation/loginUser.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);

authRouter.post('/auth/logout', logoutUserController);
authRouter.post('/auth/refresh', refreshSessionController);

export default authRouter;
