import { NextFunction, Request, Response } from 'express'
import { CreateReactionInput } from '../schemas/reaction.schema'
import { createReaction } from '../services/reaction.service'
import { findUserById } from '../services/user.service'
import { findMessages } from '../services/message.service'
import AppError from '../utils/appError'

export const createReactionHandler = async (
  req: Request<CreateReactionInput['params'], {}, CreateReactionInput['body']>,
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
      return next(new AppError(404, 'You cannot react to your own message'))
    }

    const reaction = await createReaction(req.body, user!, message[0]!)

    res.status(201).json({
      status: 'success',
      data: {
        reaction
      }
    })
  } catch (err: any) {
    next(err)
  }
}
