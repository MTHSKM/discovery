import { Static, Type } from '@sinclair/typebox';

export const processToolMultiplyBodySchema = Type.Object({
  first: Type.Number(),
  second: Type.Number(),
});

export type ProcessToolMultiplyBodyType = Static<
  typeof processToolMultiplyBodySchema
>;
