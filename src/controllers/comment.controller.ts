import { NextFunction, Request, Response } from 'express';
import {
  CreateCommentInput,
} from '../schemas/comment.schema';
import { createComment } from '../services/comment.service';
import { findUserById } from '../services/user.service';
import { findMessageById, findMessages } from '../services/message.service';

export const createCommentHandler = async (
  req: Request<CreateCommentInput['params'], {}, CreateCommentInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);
    const message = await findMessageById(req.params.messageId)


    const comment = await createComment(req.body, user!, message!);

    

    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

