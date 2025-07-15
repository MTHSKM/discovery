import { Static, Type } from '@sinclair/typebox';

export const processChatInstructionsBodySchema = Type.Object({
  question: Type.String(),
});
export type ProcessChatInstructionsBodyType = Static<
  typeof processChatInstructionsBodySchema
>;
