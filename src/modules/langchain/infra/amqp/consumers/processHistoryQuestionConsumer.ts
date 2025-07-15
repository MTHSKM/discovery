import { container } from '../../../../../shared/infra/containers';
import { ConsumerRequest } from '../../../../../shared/types/ConsumerRequest';
import { ICreateQuestionDTO } from '../../../dtos/ICreateQuestionDTO';
import { ProcessHistoryQuestionService } from '../../../services/ProcessHistoryQuestionService';

export async function processHistoryQuestionConsumer({
  message,
}: ConsumerRequest): Promise<void> {
  const processHistoryQuestionService =
    container.resolve<ProcessHistoryQuestionService>(
      'processHistoryQuestionService',
    );

  await processHistoryQuestionService.execute(message as ICreateQuestionDTO);
}
