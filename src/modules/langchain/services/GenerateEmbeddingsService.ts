import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';
import { dot, norm } from 'mathjs';
import { PCA } from 'ml-pca';

export class GenerateEmbeddingsService {
  constructor() {}

  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    return Number(dot(vec1, vec2)) / (Number(norm(vec1)) * Number(norm(vec2)));
  }

  async execute() {
    const documents = [
      'Este é o primeiro documento. Ele contém informações importantes sobre o projeto.',
      'Este é o segundo documento. Ele contém informações importantes sobre o projeto.',
      'O terceiro documento oferece uma visão geral dos resultados esperados e métricas de sucesso.',
    ];

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 50,
      chunkOverlap: 1,
    });

    const chunks = await textSplitter.createDocuments(documents);

    console.log(chunks);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: 'text-embedding-004',
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: 'Document title',
    });

    const pageContentsArray = chunks.map(chunk => chunk.pageContent);

    const embeddedChunks = await embeddings.embedDocuments(pageContentsArray);

    embeddedChunks.forEach((embeddedChunk, index) => {
      console.log(`--- embeddedChunk ${index + 1} ---`);
      console.log(embeddedChunk.slice(0, 5));
    });

    const similarities = [];

    for (let i = 0; i < embeddedChunks.length; i++) {
      for (let j = 0; j < embeddedChunks.length; j++) {
        if (i !== j) {
          const similarity = this.cosineSimilarity(
            embeddedChunks[i],
            embeddedChunks[j],
          );
          similarities.push({
            pair: `${i + 1} e ${j + 1}`,
            similarity,
          });
        }
      }
    }

    similarities.forEach(similarity =>
      console.log(similarity.pair, similarity.similarity),
    );

    const embeddedChunkArray = Array.from(embeddedChunks);

    const pca = new PCA(embeddedChunkArray);
    const pcaResult = pca.predict(embeddedChunkArray, { nComponents: 2 });

    console.log('PCA Result:', pcaResult);
  }
}
