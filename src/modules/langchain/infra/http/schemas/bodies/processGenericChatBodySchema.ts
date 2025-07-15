import { Static, Type } from '@sinclair/typebox';

export const processGenericChatBodySchema = Type.Object({
  query: Type.String(),
  role: Type.Optional(Type.String({ default: 'user' })),
});

export type ProcessGenericChatBodyType = Static<
  typeof processGenericChatBodySchema
>;
