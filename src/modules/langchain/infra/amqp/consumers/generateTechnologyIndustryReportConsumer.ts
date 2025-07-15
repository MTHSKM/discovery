import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreateTechnologyIndustryReportDTO } from '../../../dtos/ICreateTechnologyIndustryReportDTO';
import { GenerateTechnologyIndustryReportService } from '../../../services/GenerateTechnologyIndustryReportService';

export async function generateTechnologyIndustryReportConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const generateTechnologyIndustryReportService =
    container.resolve<GenerateTechnologyIndustryReportService>(
      'generateTechnologyIndustryReportService',
    );

  await generateTechnologyIndustryReportService.execute(
    message as ICreateTechnologyIndustryReportDTO,
  );
}
