import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { IMultiplyDTO } from '../../../dtos/IMultiplyDTO';
import { ProcessToolMultiplyService } from '../../../services/ProcessToolMultiplyService';

export async function processToolMultiplyConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const processToolMultiplyService =
    container.resolve<ProcessToolMultiplyService>('processToolMultiplyService');

  await processToolMultiplyService.execute(message as IMultiplyDTO);
}
