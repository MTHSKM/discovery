import { config } from 'dotenv';
import { LangchainClient } from '../../infra/grpc/client/LangchainClient';
import { ILangchainRepository } from '../models/ILangchainRepository';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PineconeStore } from '@langchain/pinecone';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';

config();

export class LangchainRepository implements ILangchainRepository {
  private client: LangchainClient;
  private embeddings: GoogleGenerativeAIEmbeddings;
  private index: Index<RecordMetadata>;

  constructor() {
    this.client = new LangchainClient(process.env.SERVER_URL);
  }

  setEmbeddings(embedding: GoogleGenerativeAIEmbeddings): void {
    this.embeddings = embedding;
  }

  async createEmbeddings(request: { document: string }[]): Promise<void> {
    return this.client.createEmbeddings(request);
  }

  async getVectorStore(request: { document: string }[]) {
    return this.client.getVectorStore(request);
  }

  async fromDocuments(docs) {
    const vectorStore = await PineconeStore.fromDocuments(
      docs,
      this.embeddings,
      {
        pineconeIndex: this.index,
        maxConcurrency: 5,
      },
    );

    return vectorStore.asRetriever({ searchType: 'similarity', k: 3 });
  }
}
