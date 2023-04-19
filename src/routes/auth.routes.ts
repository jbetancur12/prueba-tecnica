import express from 'express';
import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/signup', validate(createUserSchema), registerUserHandler);

router.post('/signin', validate(loginUserSchema), loginUserHandler);

router.get('/logout', deserializeUser, requireUser, logoutHandler);

router.get('/refresh', refreshAccessTokenHandler);

export default router;

