import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { config } from 'dotenv';
import * as fastify from 'fastify';
import * as cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import { healthRouter } from '../../../modules/health/infra/http/routes/health.routes';
import { langchainRouter } from '../../../modules/langchain/infra/http/routes/langchain.routes';

config();

const app = fastify({
  trustProxy: true,
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { translateTime: 'dd/mm HH:MM:ss Z', ignore: 'pid,hostname' },
    },
  },
});

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'LangChain App',
      version: '1.0.0',
      description: 'LangChain test',
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  staticCSP: true,
});

app.register(cors);

app.register(fastifyMultipart);

app.register(healthRouter, { prefix: '/health' });
app.register(langchainRouter, { prefix: '/langchain' });

export { app };
