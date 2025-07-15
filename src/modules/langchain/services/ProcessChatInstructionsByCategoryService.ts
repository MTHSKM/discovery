import { IAIProvider } from '../providers/models/IAIProvider';
import { ProcessChatInstructionsBodyType } from '../infra/http/schemas/bodies/processChatInstructionsBodySchema';
import { formatPlainText } from '../utils/formatPlainText';

export class ProcessChatInstructionsByCategoryService {
  constructor(private aiProvider: IAIProvider) {}

  async execute({ question }: ProcessChatInstructionsBodyType): Promise<void> {
    const promt = await this.aiProvider.createResponseBasedOnCategory(question);

    console.log(formatPlainText(promt));
  }
}
