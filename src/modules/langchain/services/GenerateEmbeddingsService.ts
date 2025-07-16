import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export class GenerateEmbeddingsService {
  constructor() {}

  async execute() {
    const documents = [
      'Este é o primeiro documento. Ele contém informações importantes sobre o projeto.',
      'Este é o segundo documento. Ele contém informações adicionais que complementam o primeiro.',
      'O terceiro documento oferece uma visão geral dos resultados esperados e métricas de sucesso.',
    ];

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });

    const chunks = await textSplitter.createDocuments(documents);

    console.log(chunks);
  }
}
