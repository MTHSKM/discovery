import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';

export class ProcessChatInstructionsService {
  constructor(private aiProvider: IAIProvider) {}

  async execute({ question }: ICreateQuestionDTO): Promise<void> {
    const prompt =
      await this.aiProvider.getRepairInstructionsFromManual(question);

    console.log(formatPlainText(prompt));
  }
}
