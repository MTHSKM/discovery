import { Static, Type } from '@sinclair/typebox';

export const processDynamicMessageBodySchema = Type.Array(
  Type.Object({
    title: Type.String(),
    content: Type.String(),
    role: Type.String(),
  }),
);

export type ProcessDynamicMessageBodyType = Static<
  typeof processDynamicMessageBodySchema
>;
