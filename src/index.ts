import http from 'http';

import config from '../config/default';

import app from './app';

const server = http.createServer(app);

const PORT = config.app.port;

server.listen(PORT);
