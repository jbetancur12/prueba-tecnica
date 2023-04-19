import { object, string, TypeOf } from 'zod';

const params = {
    params: object({
      messageId: string(),
    }),
  };

export const createReactionSchema = object({
  ...params,
  body: object({
    reaction: string({
      required_error: 'Reaction is required',
    })
  }),
});


export type CreateReactionInput = TypeOf<typeof createReactionSchema>;


