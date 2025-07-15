import { ICreateTechnologyIndustryReportDTO } from '../dtos/ICreateTechnologyIndustryReportDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';

export class GenerateTechnologyIndustryReportService {
  constructor(private aiProvider: IAIProvider) {}

  async execute({ region }: ICreateTechnologyIndustryReportDTO): Promise<void> {
    const prompt =
      await this.aiProvider.createTechnologyIndustryReportPrompt(region);

    console.log(formatPlainText(prompt));
  }
}
