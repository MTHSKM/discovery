import { Static, Type } from '@sinclair/typebox';

export const processHistoryQuestionBodySchema = Type.Object({
  question: Type.String(),
});

export type ProcessHistoryQuestionBodyType = Static<
  typeof processHistoryQuestionBodySchema
>;
