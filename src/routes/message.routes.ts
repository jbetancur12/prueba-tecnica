import express from 'express';
import {
    createMessageHandler,
    deleteMessageHandler,
    getMessageHandler,
    getMessagesHandler,
    getOwnMessagesHandler,
    updateMessageHandler,
} from '../controllers/message.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
    createMessageSchema,
    deleteMessageSchema,
    getMessageSchema,
    updateMessageSchema,
} from '../schemas/message.schema';
import { createCommentSchema } from '../schemas/comment.schema';
import { createCommentHandler } from '../controllers/comment.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
    .route('/')
    .post(validate(createMessageSchema), createMessageHandler)
    .get(getMessagesHandler);
router
    .route('/me')
    .get(getOwnMessagesHandler)

router
    .route('/comment/:messageId')
    .post(validate(createCommentSchema), createCommentHandler)

router
    .route('/:messageId')
    .get(validate(getMessageSchema), getMessageHandler)
    .patch(validate(updateMessageSchema), updateMessageHandler)
    .delete(validate(deleteMessageSchema), deleteMessageHandler);

export default router;