import { ICacheProvider } from '../models/ICacheProvider';

export class InMemoryCacheProvider implements ICacheProvider {
  private static cache: { [key: string]: unknown } = {};

  async set(key: string, value: unknown): Promise<void> {
    InMemoryCacheProvider.cache[key] = value;
  }

  async get<T>(key: string): Promise<T> {
    return InMemoryCacheProvider.cache[key] as T;
  }

  async deleteManyBySulfix(sulfix: string): Promise<void> {
    Object.keys(InMemoryCacheProvider.cache).forEach(key => {
      if (key.endsWith(sulfix)) delete InMemoryCacheProvider.cache[key];
    });
  }
}
