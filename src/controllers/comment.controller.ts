import { NextFunction, Request, Response } from 'express'
import { CreateCommentInput } from '../schemas/comment.schema'
import { createComment } from '../services/comment.service'
import { findUserById } from '../services/user.service'
import { findMessages } from '../services/message.service'
import AppError from '../utils/appError'

export const createCommentHandler = async (
  req: Request<CreateCommentInput['params'], {}, CreateCommentInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string)
    const message = await findMessages(
      { id: req.params.messageId },
      {},
      { user: true }
    )

    if (message[0].user.id === user?.id) {
      return next(new AppError(404, 'You cannot comment your own message'))
    }

    const comment = await createComment(req.body, user!, message[0]!)

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    })
  } catch (err: any) {
    next(err)
  }
}
