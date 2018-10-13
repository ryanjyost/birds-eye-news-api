module.exports = async server => {
  const keys = [
    "getFrontPages",
    "recentTags",
    "topNews",
    "recentArticles",
    "trends",
    "trendTimelines"
  ];
  let { redis } = server.app;

  for (let key of keys) {
    let newData = await server.methods[key]();
    redis.set(key, JSON.stringify(newData), "EX", 60 * 20);
  }
};
