const { bot, pluginManager } = require('./src/bot');
const logger = require('./src/utils/logger');

bot.launch().then(() => {
  logger.info('机器人已启动并正在运行！');
}).catch(error => {
  logger.error('启动机器人时出错:', error);
});

// 优雅地停止bot (例如在ctrl-c时)
process.once('SIGINT', () => {
  bot.stop('SIGINT');
  pluginManager.stopWatching();
  logger.info('机器人已停止运行 (SIGINT)');
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  pluginManager.stopWatching();
  logger.info('机器人已停止运行 (SIGTERM)');
});