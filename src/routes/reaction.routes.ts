import express from 'express';
import {
    createCommentHandler,
} from '../controllers/comment.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
    createCommentSchema,
} from '../schemas/comment.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
    .route('/messages/comment/:commentId')
    .post(validate(createCommentSchema), createCommentHandler)

export default router;