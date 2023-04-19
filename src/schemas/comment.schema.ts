import { object, string, TypeOf } from 'zod';

const params = {
    params: object({
      messageId: string(),
    }),
  };

export const createCommentSchema = object({
  ...params,
  body: object({
    content: string({
      required_error: 'Content is required',
    })
  }),
});


export type CreateCommentInput = TypeOf<typeof createCommentSchema>;


