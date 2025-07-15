import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreatePromptMessageDTO } from '../../../dtos/ICreatePromptMessageDTO';

export async function processChatInstructionsByCategoryConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const processChatInstructionsByCategoryService = container.resolve(
    'processChatInstructionsByCategoryService',
  );

  await processChatInstructionsByCategoryService.execute(
    message as ICreatePromptMessageDTO,
  );
}
