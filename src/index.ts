import http from 'http';

import config from 'config';

import app from './app';

const server = http.createServer(app);

const PORT = config.get('server.port');

server.listen(PORT);
