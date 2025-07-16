import { ISimpleAgent } from '../agents/models/ISimpleAgent';
import { ICalculateDTO } from '../dtos/ICalculateDTO';
import { IAIProvider } from '../providers/models/IAIProvider';

export class ProcessToolMultiplyService {
  constructor(
    private aiProvider: IAIProvider,
    private simpleAgent: ISimpleAgent,
  ) {}

  async execute(request: ICalculateDTO): Promise<void> {
    const result = await this.aiProvider.usingMultiplyTool(request);
    const agentResult = await this.simpleAgent.run({
      ...request,
      operator: 'exponentiation ',
    });

    console.log('result', result);
    console.log('agentResult', agentResult);
  }
}
