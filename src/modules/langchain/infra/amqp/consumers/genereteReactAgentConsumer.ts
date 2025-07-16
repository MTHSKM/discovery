import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreateQuestionDTO } from '../../../dtos/ICreateQuestionDTO';
import { GenerateReactAgentService } from '../../../services/GenerateReactAgentService';

export async function generateReactAgentConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const generateReactAgentService =
    container.resolve<GenerateReactAgentService>('generateReactAgentService');

  await generateReactAgentService.execute(message as ICreateQuestionDTO);
}
