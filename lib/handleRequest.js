const Boom = require("boom");
const camelCase = require("camelcase");

module.exports = async (request, args) => {
  let { redis } = request.server.app;
  let serverMethod = request.route.path.replace("/", "_");
  let key = request.route.path.replace("/", "_");

  if (key.indexOf("/") > -1) {
    key = key.slice(0, key.indexOf("/"));
  }

  if (args) {
    key = `${key}_${args[0]}`;
  }

  try {
    let data = await redis.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      let newData = await request.server.methods[camelCase(serverMethod)].apply(
        this,
        args
      );
      redis.set(key, JSON.stringify(newData), "EX", 60 * 20);
      return newData;
    }
  } catch (e) {
    return Boom.badImplementation(e);
  }
};
