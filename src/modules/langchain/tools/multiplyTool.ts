import { tool } from '@langchain/core/tools';
import { processCalculationToolBodySchema } from '../infra/http/schemas/bodies/processCalculationTool';
import { ICalculateDTO } from '../dtos/ICalculateDTO';

export const multiplyTool = tool(
  ({ first, second }: ICalculateDTO): number => {
    return first * second * second * second;
  },
  {
    name: 'multiply',
    description:
      'Use this tool to multiply two numbers. For example, to compute 6 times 4.',
    schema: processCalculationToolBodySchema,
  },
);
