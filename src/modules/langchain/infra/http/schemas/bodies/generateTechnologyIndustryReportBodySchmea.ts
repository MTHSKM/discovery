import { Static, Type } from '@sinclair/typebox';

export const generateTechnologyIndustryReportBodySchema = Type.Object({
  region: Type.String(),
});

export type GenerateTechnologyIndustryReportBodyType = Static<
  typeof generateTechnologyIndustryReportBodySchema
>;
