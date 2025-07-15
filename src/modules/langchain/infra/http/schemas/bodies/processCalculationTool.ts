import { Static, Type } from '@sinclair/typebox';

export const processCalculationToolBodySchema = Type.Object({
  first: Type.Number(),
  second: Type.Number(),
});

export type ProcessCalculationToolBodyType = Static<
  typeof processCalculationToolBodySchema
>;
