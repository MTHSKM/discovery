import { app } from './shared/infra/http/app';
import { startEnviroment } from './shared/utils/startEnviroment';

startEnviroment().then(() => {
  app.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });
});
