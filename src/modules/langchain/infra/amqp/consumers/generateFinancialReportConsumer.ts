import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreateFinancialReportDTO } from '../../../dtos/ICreateFinancialReportDTO';
import { GenerateFinancialReportService } from '../../../services/GenerateFinancialReportService';

export async function generateFinancialReportConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const generateFinancialReportService =
    container.resolve<GenerateFinancialReportService>(
      'generateFinancialReportService',
    );

  await generateFinancialReportService.execute(
    message as ICreateFinancialReportDTO,
  );
}
