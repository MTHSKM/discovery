import { SecondScrappingService } from './modules/web_scrapping/services/SecondScrappingService';
import { container } from './shared/infra/containers';
import { app } from './shared/infra/http/app';
import { startEnviroment } from './shared/utils/startEnviroment';

startEnviroment().then(async () => {
  app.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });

  const x = container.resolve<SecondScrappingService>('secondScrappingService');

  await x.execute();
});
