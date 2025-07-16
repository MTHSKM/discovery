import { asClass, AwilixContainer } from 'awilix';
import { SimpleAgent } from '../../../modules/langchain/agents/implementations/SimpleAgent';
import { ReactAgent } from '../../../modules/langchain/agents/implementations/ReactAgent';

export function registerAgents(container: AwilixContainer): void {
  container.register(
    'simpleAgent',
    asClass(SimpleAgent, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'reactAgent',
    asClass(ReactAgent, { lifetime: 'SINGLETON' }),
  );
}
