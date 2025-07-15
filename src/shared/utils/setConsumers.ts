import { connect } from 'amqplib';
import { container } from '../infra/containers';
import { ICacheProvider } from '../providers/models/ICacheProvider';
import { asValue } from 'awilix';
import { setLangchainConsumers } from '../../modules/langchain/infra/amqp/setLangchainConsumers';

export async function setConsumers(): Promise<void> {
  const amqpConnection = await connect(process.env.RABBITMQ_HOST);

  const cacheProvider = container.resolve<ICacheProvider>(
    'inMemoryCacheProvider',
  );

  const healthKey = 'health-check';

  amqpConnection.on(
    'close',
    async () => await cacheProvider.set(healthKey, false),
  );

  amqpConnection.on(
    'error',
    async () => await cacheProvider.set(healthKey, false),
  );

  container.register('amqpConnection', asValue(amqpConnection));

  await setLangchainConsumers();
}
