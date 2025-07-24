import { createContainer } from 'awilix';
import { registerProviders } from './registerProviders';
import { registerServices } from './registerServices';
import { registerAgents } from './registerAgents';
import { registerRepositories } from './registerRepositories';

const container = createContainer({ injectionMode: 'CLASSIC' });

registerProviders(container);
registerServices(container);
registerAgents(container);
registerRepositories(container);

export { container };
