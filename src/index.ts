// import { ThirdScrappingService } from './modules/web_scrapping/services/ThirdScrappingService';
// import { container } from './shared/infra/containers';
import { app } from './shared/infra/http/app';
import { startEnviroment } from './shared/utils/startEnviroment';

startEnviroment().then(async () => {
  app.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });

  // const x = container.resolve<ThirdScrappingService>('thirdScrappingService');

  await x.execute();
});
