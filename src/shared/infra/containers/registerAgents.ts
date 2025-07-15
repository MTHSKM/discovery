import { asClass, AwilixContainer } from 'awilix';
import { SimpleAgent } from '../../../modules/langchain/agents/implementations/SimpleAgent';

export function registerAgents(container: AwilixContainer): void {
  container.register(
    'simpleAgent',
    asClass(SimpleAgent, { lifetime: 'SINGLETON' }),
  );
}
