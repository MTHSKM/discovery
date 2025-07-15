import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreateDynamicMessagesTemplateDTO } from '../../../dtos/ICreateDynamicMessagesTemplateDTO';
import { ProcessDynamicMessageService } from '../../../services/ProcessDynamicMessageService';

export async function processDynamicMessageConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const processDynamicMessageService =
    container.resolve<ProcessDynamicMessageService>(
      'processDynamicMessageService',
    );

  await processDynamicMessageService.execute(
    message as ICreateDynamicMessagesTemplateDTO[],
  );
}
