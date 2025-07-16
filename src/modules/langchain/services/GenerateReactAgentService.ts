import { IReactAgent } from '../agents/models/IReactAgent';
import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import { formatPlainText } from '../utils/formatPlainText';

export class GenerateReactAgentService {
  constructor(private reactAgent: IReactAgent) {}

  async execute({ question }: ICreateQuestionDTO): Promise<void> {
    const response = await this.reactAgent.run(question);

    console.log(formatPlainText(response));
  }
}
