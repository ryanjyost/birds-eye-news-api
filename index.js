const createServer = require("./server");
const { promisify } = require("util");
const redis = require("redis");

const start = async () => {
  const server = await createServer();

  const redisClient = redis.createClient({
    host: process.env.REDIS_URL || "localhost",
    port: 6379
  });

  // redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
  // redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
  // redisClient.llenAsync = promisify(redisClient.llen).bind(redisClient);
  // redisClient.lremAsync = promisify(redisClient.lrem).bind(redisClient);
  // redisClient.lsetAsync = promisify(redisClient.lset).bind(redisClient);
  redisClient.get = promisify(redisClient.get).bind(redisClient);
  redisClient.set = promisify(redisClient.set).bind(redisClient);

  redisClient.on("error", function(err) {
    console.error("Redis error.", err);
  });

  server.app.redis = redisClient;

  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Server docs running at: ${server.info.uri}/docs`);
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

start();
