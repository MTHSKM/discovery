import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICalculateDTO } from '../../../dtos/ICalculateDTO';
import { ProcessToolMultiplyService } from '../../../services/ProcessToolMultiplyService';

export async function processToolMultiplyConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const processToolMultiplyService =
    container.resolve<ProcessToolMultiplyService>('processToolMultiplyService');

  await processToolMultiplyService.execute(message as ICalculateDTO);
}
