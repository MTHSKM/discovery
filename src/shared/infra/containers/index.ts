import { createContainer } from 'awilix';
import { registerProviders } from './registerProviders';
import { registerServices } from './registerServices';

const container = createContainer({ injectionMode: 'CLASSIC' });

registerProviders(container);
registerServices(container);

export { container };
