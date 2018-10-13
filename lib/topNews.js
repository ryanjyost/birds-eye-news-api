const axios = require("axios");
const tsvToJSON = require("./tsvJSON");
const _ = require("lodash");
const _lib = require("./helpers");
const striptags = require("striptags");
const BatchOfTags = require("../models/batchOfTags.js");
const Article = require("../models/article.js");
const moment = require("moment");
const sites = require("../sites");
const shuffle = require("shuffle-array");
const getTopic = require("./getSingleTopic");

module.exports = async () => {
  // ...batches from the previous week
  const batches = await getBatches();

  // most common words
  const topTags = batches[0].tags.sort((a, b) => {
    let aCount = a ? ("sourceCount" in a ? a.sourceCount : 0) : 0;
    let bCount = b ? ("sourceCount" in b ? b.sourceCount : 0) : 0;
    if (aCount < bCount) {
      return 1;
    } else if (bCount < aCount) {
      return -1;
    } else {
      return 0;
    }
  });

  // .....get articles
  const articles = await getArticles();

  // ....top topic
  let topicsToGet = 2;
  const topics = [];
  let articlesUsed = [];
  for (let i = 0; i < topicsToGet; i++) {
    let topicIndex = i,
      newTopicFound = false,
      avoidInfinity = 0;

    while (!newTopicFound && avoidInfinity < 100) {
      if (!topTags[topicIndex]) {
        break;
      }

      let skipTopic = topics.find(topic => {
        return (
          topic.main.term.includes(topTags[topicIndex].term) ||
          topTags[topicIndex].term.includes(topic.main.term) ||
          topTags[topicIndex].sourceCount < 20
        );
      });

      if (skipTopic) {
        avoidInfinity++;
        topicIndex++;
      } else {
        let topic = await getTopic(topicIndex, topTags, articles, articlesUsed);
        topics.push(topic);
        newTopicFound = true;
        // keep track of articles already used
        let used = [
          ...topic.preview.politics,
          ...topic.preview.opinions,
          ...topic.preview.more
        ].map(article => {
          return article.id;
        });

        articlesUsed = [...articlesUsed, ...used];

        i = topicIndex;
      }
    }
  }

  return { batches, topics };
};

// batches from the previous week
const getBatches = async () => {
  const batches = await BatchOfTags.find(
    {},
    {},
    { sort: { created_at: -1 } },

    function(err, batch) {
      return batch;
    }
  ).limit(24 * 4);

  // let sorted = batches.sort((a, b) => {
  //   if (moment(a.created_at).isAfter(moment(b.created_at))) {
  //     return -1;
  //   } else if (moment(b.created_at).isAfter(moment(a.created_at))) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  return batches;
};

// articles
const getArticles = async () => {
  let politicsArticles = [];

  for (let site of sites) {
    let hasPolitics = site.rss.find(feed => {
      return feed.category === "politics";
    });
    if (hasPolitics) {
      let params = {
        siteName: site.name,
        category: "politics",
        created_at: {
          $gte: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000)
        }
      };

      let articles = await Article.find(
        params,
        {},
        { sort: { created_at: -1 } },
        function(err, articles) {
          return articles;
        }
      ).limit(10);

      politicsArticles = politicsArticles.concat(articles);
    }
  }

  let opinionArticles = [];

  for (let site of sites) {
    let hasOpinions = site.rss.find(feed => {
      return feed.category === "opinion";
    });
    if (hasOpinions) {
      let params = { siteName: site.name, category: "opinion" };
      let articles = await Article.find(
        params,
        {},
        { sort: { created_at: -1 } },
        function(err, articles) {
          return articles;
        }
      ).limit(10);

      opinionArticles = opinionArticles.concat(articles);
    }
  }

  return {
    politics: shuffle(politicsArticles),
    opinion: shuffle(opinionArticles),
    combined: shuffle([...politicsArticles, ...opinionArticles])
  };
  // return {};
};
