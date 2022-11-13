import http from 'http';

import config from '../config/default';

import app from './app';

const server = http.createServer(app);

const PORT = config.app.port;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started 🚀 on port ${PORT}`);
});
