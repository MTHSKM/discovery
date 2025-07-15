import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreateQuestionDTO } from '../../../dtos/ICreateQuestionDTO';
import { ProcessChatInstructionsService } from '../../../services/ProcessChatInstructionsService';

export async function processChatInstructionsConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const processChatInstructionsService =
    container.resolve<ProcessChatInstructionsService>(
      'processChatInstructionsService',
    );

  await processChatInstructionsService.execute(message as ICreateQuestionDTO);
}
