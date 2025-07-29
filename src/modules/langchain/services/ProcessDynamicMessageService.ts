import { writeFile } from 'fs/promises';
import { IReactAgent } from '../agents/models/IReactAgent';
import { ICreateDynamicMessagesTemplateDTO } from '../dtos/ICreateDynamicMessagesTemplateDTO';
import { IAIProvider } from '../providers/models/IAIProvider';
import { formatPlainText } from '../utils/formatPlainText';
import { TMP_FILES_PATH } from '../../../config/path/temp';
import path = require('path');

export class ProcessDynamicMessageService {
  constructor(
    private aiProvider: IAIProvider,
    private reactAgent: IReactAgent,
  ) {}

  async execute(request: ICreateDynamicMessagesTemplateDTO[]): Promise<void> {
    const prompt =
      await this.aiProvider.createDynamicMessagesPromptTemplate(request);

    console.log(formatPlainText(prompt));

    const fileDinamico = path.join(TMP_FILES_PATH, 'fileDinamico.txt');

    await writeFile(fileDinamico, formatPlainText(prompt));

    const response = await this.reactAgent.run(
      `${formatPlainText(prompt)}. Com esse relatório, pode me trazer alguma solução para o meu problema? Caso a solução seja inconclusiva, pode retornar perguntas para eu acrescentar na sua certeza?`,
    );

    const fileResposta = path.join(TMP_FILES_PATH, 'fileResposta.txt');

    await writeFile(fileResposta, formatPlainText(response));

    console.log(formatPlainText(response));
  }
}
