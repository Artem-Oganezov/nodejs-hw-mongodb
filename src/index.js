import { initMongoConnection } from './db/initMongoConnection.js';

await initMongoConnection();
setupServer();
import { setupServer } from './server.js';
