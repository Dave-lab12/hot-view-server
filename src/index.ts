import http from 'http';

import config from '../config/default';

import app from './app';
import logger from './utils/logger';

const server = http.createServer(app);

const PORT = config.app.port;

server.listen(PORT, () => {
  logger.info(`Server started 🚀 on port ${PORT}`);
});
