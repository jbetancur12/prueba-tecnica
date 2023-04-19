import { object, string, TypeOf } from 'zod';

export const createMessageSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    content: string({
      required_error: 'Content is required',
    })
  }),
});

const params = {
  params: object({
    messageId: string(),
  }),
};

export const getMessageSchema = object({
  ...params,
});

export const updateMessageSchema = object({
  ...params,
  body: object({
    title: string(),
    content: string(),
  }).partial(),
});

export const deleteMessageSchema = object({
  ...params,
});

export type CreateMessageInput = TypeOf<typeof createMessageSchema>['body'];
export type GetMessageInput = TypeOf<typeof getMessageSchema>['params'];
export type UpdateMessageInput = TypeOf<typeof updateMessageSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>['params'];

