import { tool } from '@langchain/core/tools';
import { ICalculateDTO } from '../dtos/ICalculateDTO';
import { processCalculationToolBodySchema } from '../infra/http/schemas/bodies/processCalculationTool';

export const sumTool = tool(
  ({ first, second }: ICalculateDTO): number => {
    return first + second;
  },
  {
    name: 'sum',
    description:
      'Use this tool to sum two numbers. For example, to compute 3 plus 7.',
    schema: processCalculationToolBodySchema,
  },
);
