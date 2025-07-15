import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';

export class ProcessHistoryQuestionService {
  constructor(private aiProvider: IAIProvider) {}

  async execute({ question }: ICreateQuestionDTO): Promise<void> {
    const prompt =
      await this.aiProvider.createHistoryProfessorPromptTemplate(question);

    console.log(formatPlainText(prompt));
  }
}
