const createServer = require("./server");
const { promisify } = require("util");
const redis = require("redis");
const url = require("url");
const cron = require("node-cron");
const hydrateCache = require("./lib/hydrateCache");
require("dotenv").config();

const start = async () => {
  const server = await createServer();

  let redisURL = "localhost",
    redisPort = 6379;
  if (process.env.REDISCLOUD_URL) {
    let parsedURL = url.parse(process.env.REDISCLOUD_URL);
    redisURL = parsedURL.hostname;
    redisPort = parsedURL.port;
  }
  const redisClient = redis.createClient({
    host: redisURL,
    port: redisPort,
    no_ready_check: true
  });

  if (process.env.REDIS_PASSWORD) {
    redisClient.auth(process.env.REDIS_PASSWORD);
  }

  redisClient.get = promisify(redisClient.get).bind(redisClient);
  redisClient.set = promisify(redisClient.set).bind(redisClient);

  redisClient.on("error", function(err) {
    console.error("Redis error.", err);
  });

  server.app.redis = redisClient;
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Server docs running at: ${server.info.uri}/docs`);

  // run cron job
  const task = cron.schedule("*/15 * * * *", () => {
    hydrateCache(server);
  });

  task.start();
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

start();
