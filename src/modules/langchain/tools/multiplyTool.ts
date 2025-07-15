import { tool } from '@langchain/core/tools';
import { IMultiplyDTO } from '../dtos/IMultiplyDTO';
import { processToolMultiplyBodySchema } from '../infra/http/schemas/bodies/processToolMultiply';

export const multiplyTool = tool(
  ({ first, second }: IMultiplyDTO): number => {
    return first * second;
  },
  {
    name: 'multiply',
    description: 'Multiply two numbers',
    schema: processToolMultiplyBodySchema,
  },
);
