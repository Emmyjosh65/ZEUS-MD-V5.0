import 'dotenv/config';
import http from 'http';
import config from './config.js';
import { botController } from './src/core/bot.js';

process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Unhandled rejection:', reason?.stack || reason);
});
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught exception:', err?.stack || err);
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ZEUS-MD Bot is running\n');
});
server.on('error', (err) => {
  console.error(`⚠️ Health server error (port ${config.port}): ${err.message}`);
});
server.listen(config.port, () => {
  console.log(`🌐 Health check server listening on port ${config.port}`);
});

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => botController.shutdown(sig));
}

botController.init().catch((err) => {
  console.error('❌ Fatal startup error:', err?.stack || err);
  process.exit(1);
});
