import { NextFunction, Request, Response } from 'express';
import {
  CreateMessageInput,
  DeleteMessageInput,
  GetMessageInput,
  UpdateMessageInput,
} from '../schemas/message.schema';
import { createMessage, findMessages, getMessage } from '../services/message.service';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';

export const createMessageHandler = async (
  req: Request<{}, {}, CreateMessageInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    const message = await createMessage(req.body, user!);

    res.status(201).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Message with that title already exist',
      });
    }
    next(err);
  }
};

export const getMessageHandler = async (
  req: Request<GetMessageInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await getMessage(req.params.messageId);

    if (!message) {
      return next(new AppError(404, 'Message with that ID not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getOwnMessagesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const user = await findUserById(res.locals.user.id as string);

 

      const messages = await findMessages({user: {id: user?.id}},{},{user: true});
  
    
  
      res.status(200).json({
        status: 'success',
        data: {
          messages,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };

export const getMessagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await findMessages({}, {}, {comments: true, user:true});

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateMessageHandler = async (
  req: Request<UpdateMessageInput['params'], {}, UpdateMessageInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await getMessage(req.params.messageId);

    if (!message) {
      return next(new AppError(404, 'Message with that ID not found'));
    }

    Object.assign(message, req.body);

    const updatedMessage = await message.save();

    res.status(200).json({
      status: 'success',
      data: {
        message: updatedMessage,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

  

export const deleteMessageHandler = async (
  req: Request<DeleteMessageInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await getMessage(req.params.messageId);

    const user = await findUserById(res.locals.user.id as string); 

    const messageisFromUser = await findMessages({user: {id: user?.id}, id:req.params.messageId },{},{user: true});

    if (!message) {
      return next(new AppError(404, 'Message with that ID not found'));
    }
    if(messageisFromUser.length === 0){
        return next(new AppError(404, 'Message do not belong to User'));
    }

    await message.remove();

    res.status(204).json({
      status: 'OK',
      delete: true,
    });
  } catch (err: any) {
    next(err);
  }
};