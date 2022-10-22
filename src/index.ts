import app from './app';
import http from 'http';
const server = http.createServer(app);

const PORT = process.env.PORT || 8001;

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
