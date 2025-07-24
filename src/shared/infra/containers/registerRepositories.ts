import { asClass, AwilixContainer } from 'awilix';
import { LangchainRepository } from '../../../modules/langchain/repositories/implementations/LangchainRepository';

export function registerRepositories(container: AwilixContainer): void {
  container.register(
    'langchainRepository',
    asClass(LangchainRepository, {
      lifetime: 'SINGLETON',
    }),
  );
}
