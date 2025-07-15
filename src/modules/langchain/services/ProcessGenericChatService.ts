import { ICreatePromptMessageDTO } from '../dtos/ICreatePromptMessageDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';

export class ProcessGenericChatService {
  constructor(private aiProvider: IAIProvider) {}

  async execute({ text, role }: ICreatePromptMessageDTO): Promise<void> {
    const prompt = await this.aiProvider.queryLLM({
      text,
      role,
    });

    console.log(formatPlainText(prompt));
  }
}
