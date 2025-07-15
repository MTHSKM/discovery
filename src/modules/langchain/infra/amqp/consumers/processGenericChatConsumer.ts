import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreatePromptMessageDTO } from '../../../dtos/ICreatePromptMessageDTO';
import { ProcessGenericChatService } from '../../../services/ProcessGenericChatService';
import { ProcessGenericChatBodyType } from '../../http/schemas/bodies/processGenericChatBodySchema';

interface IRequest extends ConsumerRequest {
  message: ProcessGenericChatBodyType;
}

export async function processGenericChatConsumer({
  message,
}: IRequest): Promise<void> {
  const processGenericChatService =
    container.resolve<ProcessGenericChatService>('processGenericChatService');

  const newMessage = {
    text: message.query,
    role: message.role,
  };

  await processGenericChatService.execute(
    newMessage as ICreatePromptMessageDTO,
  );
}
