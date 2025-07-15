import { IMultiplyDTO } from '../dtos/IMultiplyDTO';
import { IAIProvider } from '../providers/models/IAIProvider';

export class ProcessToolMultiplyService {
  constructor(private aiProvider: IAIProvider) {}

  async execute(request: IMultiplyDTO): Promise<void> {
    const result = await this.aiProvider.usingMultiplyTool(request);

    console.log(result);
  }
}
