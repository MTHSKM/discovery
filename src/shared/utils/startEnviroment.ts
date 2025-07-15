import { container } from '../infra/containers';
import { ICacheProvider } from '../providers/models/ICacheProvider';
import { setConsumers } from './setConsumers';

export async function startEnviroment(): Promise<void> {
  await setConsumers();

  const cacheProvider = container.resolve<ICacheProvider>(
    'inMemoryCacheProvider',
  );

  cacheProvider.set('health-check', true);
}
