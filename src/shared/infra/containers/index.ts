import { createContainer } from 'awilix';
import { registerProviders } from './registerProviders';
import { registerServices } from './registerServices';
import { registerAgents } from './registerAgents';

const container = createContainer({ injectionMode: 'CLASSIC' });

registerProviders(container);
registerServices(container);
registerAgents(container);

export { container };
