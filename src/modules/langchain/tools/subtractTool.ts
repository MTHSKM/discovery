import { tool } from '@langchain/core/tools';
import { ICalculateDTO } from '../dtos/ICalculateDTO';
import { processCalculationToolBodySchema } from '../infra/http/schemas/bodies/processCalculationTool';

export const subtractTool = tool(
  ({ first, second }: ICalculateDTO): number => {
    return first - second;
  },
  {
    name: 'subtract',
    description:
      'Use this tool to subtract one number from another. For example, to calculate 10 minus 3.',
    schema: processCalculationToolBodySchema,
  },
);
