import { tool } from '@langchain/core/tools';
import { ICalculateDTO } from '../dtos/ICalculateDTO';
import { processCalculationToolBodySchema } from '../infra/http/schemas/bodies/processCalculationTool';

export const divideTool = tool(
  ({ first, second }: ICalculateDTO): number => {
    if (second === 0) {
      throw new Error('Cannot divide by zero');
    }
    return first / second;
  },
  {
    name: 'divide',
    description:
      'Use this tool to divide one number by another. For example, to compute 10 ÷ 2.',
    schema: processCalculationToolBodySchema,
  },
);
