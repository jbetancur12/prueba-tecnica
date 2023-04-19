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

/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: UserName
 *              email:
 *                  type: string
 *                  description: Email
 *              password:
 *                  type: string
 *                  description: Password
 *              fullname:
 *                  type: string
 *                  description: The Full Name
 *          required:
 *              - username
 *              - email
 *              - password
 *              - fullname
 *          example:
 *               username: jhondoe
 *               email: jhon@doe.com
 *               password: jhon1234
 *               fullname: Jhon Doe                   
 */

/**
 * @swagger
 * /wires/auth/signup:
 *  post: 
 *      summary: Create a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Auth'
 *      responses:
 *          200:
 *              description: New User Created
 */

router.post('/signup', validate(createUserSchema), registerUserHandler);

router.post('/signin', validate(loginUserSchema), loginUserHandler);

router.get('/logout', deserializeUser, requireUser, logoutHandler);

router.get('/refresh', refreshAccessTokenHandler);

export default router;

