const _lib = require("./helpers");
const striptags = require("striptags");
const Article = require("../models/article");
const Batch = require("../models/batch");
const moment = require("moment");

module.exports = async function(source) {
  let politicsArticles = [];

  let hasPolitics = source.rss.find(feed => {
    return feed.category === "politics";
  });
  if (hasPolitics) {
    let params = {
      siteName: source.name,
      category: "politics"
      // created_at: {
      //   $gte: new Date(new Date().getTime() - 300 * 24 * 60 * 60 * 1000)
      // }
    };

    let articles = await Article.find(
      params,
      {},
      { sort: { created_at: -1 } },
      function(err, articles) {
        return articles;
      }
    ).limit(300);

    politicsArticles = politicsArticles.concat(articles);
  }

  let opinionArticles = [];

  let hasOpinions = source.rss.find(feed => {
    return feed.category === "opinion";
  });
  if (hasOpinions) {
    let params = {
      siteName: source.name,
      category: "opinion"
      // created_at: {
      //   $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      // }
    };
    let articles = await Article.find(
      params,
      {},
      { sort: { created_at: -1 } },
      function(err, articles) {
        return articles;
      }
    ).limit(300);

    opinionArticles = opinionArticles.concat(articles);
  }

  let combinedText = "",
    politicsText = "",
    opinionText = "";

  for (let article of politicsArticles) {
    combinedText = combinedText + " " + striptags(article.title.trim());
    politicsText = politicsText + " " + striptags(article.title.trim());
  }

  for (let article of opinionArticles) {
    combinedText = combinedText + " " + striptags(article.title.trim());
    opinionText = opinionText + " " + striptags(article.title.trim());
  }

  const topTagsCombined = _lib.getTopTagsFromText(combinedText);
  const topTagsPolitics = _lib.getTopTagsFromText(politicsText);
  const topTagsOpinion = _lib.getTopTagsFromText(opinionText);

  let combinedArticles = [...politicsArticles, ...opinionArticles];
  for (let tag of topTagsCombined) {
    // console.log(combinedArticles.length);
    let combinedText = "",
      articleCount = 0;
    combinedArticles.map(article => {
      // console.log(article.title);
      if (article.title.toLowerCase().includes(tag.term)) {
        combinedText = combinedText + " " + striptags(article.title.trim());
        articleCount++;
      }
    });

    const tags = _lib.getTopTagsFromText(combinedText, 3);
    tag.related = tags || [];
    tag.sourceCount = articleCount;
  }

  const batches = await Batch.find(
    {
      "records.1": { $exists: true },
      created_at: {
        $gte: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000)
      }
    }, //make sure there's records in the batch
    {},
    { sort: { created_at: -1 } },

    function(err, batch) {
      return batch;
    }
  );

  return {
    source: source,
    tags: topTagsCombined,
    // politicsTags: topTagsPolitics,
    // opinionTags: topTagsOpinion,
    sourceCount: combinedArticles.length,
    // opinionArticles,
    // politicsArticles,
    combinedArticles,
    batches
  };
};
