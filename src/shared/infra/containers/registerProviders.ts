import { asClass, AwilixContainer } from 'awilix';
import { InMemoryCacheProvider } from '../../providers/implementations/InMemoryCacheProvider';
import { AIProvider } from '../../../modules/langchain/providers/implementations/AIProvider';
import { RabbitmqMessageQueueProvider } from '../../providers/implementations/RabbitmqMessageQueueProvider';

export function registerProviders(container: AwilixContainer): void {
  container.register(
    'inMemoryCacheProvider',
    asClass(InMemoryCacheProvider, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'aiProvider',
    asClass(AIProvider, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'rabbitmqMessageQueueProvider',
    asClass(RabbitmqMessageQueueProvider, { lifetime: 'SINGLETON' }),
  );
}
