import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

export interface ILangchainRepository {
  createEmbeddings(request: { document: string }[]): Promise<void>;
  getVectorStore(request: { document: string }[]);
  setEmbeddings(embedding: GoogleGenerativeAIEmbeddings): void;
  fromDocuments(docs);
}
