import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';
import { ILangchainRepository } from '../repositories/models/ILangchainRepository';
import { IZipProvider } from '../../../shared/providers/models/IZipProvider';

export class GenerateEmbeddingsService {
  constructor(
    private langchainRepository: ILangchainRepository,
    private zipProvider: IZipProvider,
  ) {}

  async execute() {
    // CREATE PDF DOCUMENTS CHUNKS ON VECTOR DATA BASE
    const documents = await this.zipProvider.loadPDFsFromFolder('documentos');
    console.log(documents.map(doc => doc.text));

    const documentObjects = documents.map(doc => ({ document: doc.text }));
    await this.langchainRepository.createEmbeddings(documentObjects);
    // // GET VECTOR STORE
    // const vectorStore =
    //   await this.langchainRepository.getVectorStore(documentObjects);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });

    const chunks = await textSplitter.createDocuments(documents);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: 'text-embedding-004',
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: 'Document title',
    });

    this.langchainRepository.setEmbeddings(embeddings);

    const vectorStore = await this.langchainRepository.fromDocuments(chunks);

    console.log('Vector Store:', vectorStore);
  }
}
