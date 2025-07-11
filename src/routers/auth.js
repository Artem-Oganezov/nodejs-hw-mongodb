import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUser.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { loginUserValidationSchema } from '../validation/loginUser.js';
import {
  sendResetEmailSchema,
  sendResetPasswordSchema,
} from '../validation/resetPwd.js';

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
authRouter.post(
  '/auth/send-reset-email',
  validateBody(sendResetEmailSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-pwd',
  validateBody(sendResetPasswordSchema),
  resetPasswordController,
);

export default authRouter;
