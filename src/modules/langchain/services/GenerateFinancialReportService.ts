import { ICreateFinancialReportDTO } from '../dtos/ICreateFinancialReportDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';

export class GenerateFinancialReportService {
  constructor(private aiProvider: IAIProvider) {}

  async execute({
    analyses,
    company,
    language,
    period,
  }: ICreateFinancialReportDTO): Promise<void> {
    const prompt = await this.aiProvider.createFinancialReportPrompt({
      analyses,
      company,
      language,
      period,
    });

    console.log(formatPlainText(prompt));
  }
}
