import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import { resolve as resolvePath } from 'path';
import { loadSync } from '@grpc/proto-loader';
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';

export class LangchainClient {
  private client: ServiceClient;

  constructor(serverUrl: string) {
    const protoPath = resolvePath(
      __dirname,
      '..',
      'protocols',
      'Langchain.proto',
    );

    const packageDefinition = loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const packageDescriptor = loadPackageDefinition(packageDefinition);

    this.client = new packageDescriptor.langchain['LangchainService'](
      serverUrl,
      credentials.createInsecure(),
    );
  }

  async createEmbeddings(request: { document: string }[]) {
    return new Promise<void>((resolve, reject) => {
      const call = this.client.createEmbeddings(request, (error: unknown) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });

      request.forEach(doc => call.write(doc));

      call.end();
    });
  }

  async getVectorStore(request: { document: string }[]) {
    return new Promise<string>((resolve, reject) => {
      const call = this.client.getVectorStore(
        request,
        (error: unknown, response: { vectorStoreString: string }) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(JSON.parse(response.vectorStoreString));
        },
      );

      request.forEach(doc => call.write(doc));

      call.end();
    });
  }
}
