import { ICreateDynamicMessagesTemplateDTO } from '../dtos/ICreateDynamicMessagesTemplateDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';

export class ProcessDynamicMessageService {
  constructor(private aiProvider: IAIProvider) {}

  async execute(request: ICreateDynamicMessagesTemplateDTO[]): Promise<void> {
    const prompt =
      await this.aiProvider.createDynamicMessagesPromptTemplate(request);

    console.log(formatPlainText(prompt));
  }
}
