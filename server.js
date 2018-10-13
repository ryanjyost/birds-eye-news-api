"use strict";

const Hapi = require("hapi");
const db = require("./db").db;
const routes = require("./routes");

const getFrontPages = require("./lib/getFrontPages");
const recentTags = require("./lib/recentTags");
const topNews = require("./lib/topNews");
const chyrons = require("./lib/chyrons");
const recentArticles = require("./lib/recentArticles");
const trends = require("./lib/trends");
const trendTimelines = require("./lib/trendTimelines");
const termAnalysis = require("./lib/termAnalysis");
const termsForAnalysis = require("./lib/termsForAnalysis");

// Create a server with a host and port
module.exports = async () => {
  const server = Hapi.server({
    port: ~~process.env.PORT || 8000,
    routes: { cors: { origin: ["*"] } }
  });

  // Add the route
  server.route(routes);
  const cacheConfig = {
    // expiresIn: 1000 * 60 * 15, // 15 minutes
    expiresIn: 30 * 1000,
    generateTimeout: 100
  };

  // server methods
  server.method("getFrontPages", getFrontPages);
  server.method("recentTags", recentTags);
  server.method("topNews", topNews);
  server.method("chyrons", chyrons);
  server.method("recentArticles", recentArticles);
  server.method("trends", trends);
  server.method("trendTimelines", trendTimelines);
  server.method("termAnalysis", termAnalysis);
  server.method("termsForAnalysis", termsForAnalysis);

  return server;
};

// Start the server
// async function start() {
//   try {
//     await server.start();
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
//
//   console.log("Server running at:", server.info.uri);
// }
//
// start();
