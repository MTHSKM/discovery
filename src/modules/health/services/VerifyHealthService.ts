import { HttpError } from '../../../shared/errors/HttpError';
import { ICacheProvider } from '../../../shared/providers/models/ICacheProvider';

export class VerifyHealthService {
  constructor(private inMemoryCacheProvider: ICacheProvider) {}

  async execute(): Promise<void> {
    const healthChecker = await this.inMemoryCacheProvider.get('health-check');

    if (!healthChecker) throw new HttpError(500, 'Health check failed');
  }
}
