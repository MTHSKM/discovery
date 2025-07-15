import { Static, Type } from '@sinclair/typebox';

export const generateFinancialReportBodySchema = Type.Object({
  company: Type.String(),
  period: Type.String(),
  language: Type.String(),
  analyses: Type.Array(Type.String()),
});

export type GenerateFinancialReportBodyType = Static<
  typeof generateFinancialReportBodySchema
>;
