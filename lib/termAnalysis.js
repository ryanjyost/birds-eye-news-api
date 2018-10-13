const Article = require("../models/article.js");
const getTopic = require("./getSingleTopic");
const BatchOfTags = require("../models/batchOfTags.js");
const shuffle = require("shuffle-array");

module.exports = async function(term) {
  let articles = await getArticles(term);
  const batches = await getBatches();

  let tag = null;
  tag = batches[0].tags.find(item => {
    return item.term === term;
  });

  if (!tag) {
    for (let batch of batches) {
      tag = batch.tags.find(item => {
        return item.term === term;
      });

      if (tag) {
        break;
      }
    }
  }

  let topic = await getTopic(0, [tag], articles, []);

  let otherRelated = [];
  for (let tag of batches[0].tags) {
    let found = tag.related.find(item => {
      return item.term === term;
    });
    if (found) {
      otherRelated.push(found);
    }
  }

  return { articles, batches, topic, related: otherRelated };
};

const getArticles = async term => {
  let polticsParams = {
    category: "politics",
    title: { $regex: new RegExp(term, "i") },
    created_at: {
      $gte: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000)
    }
  };

  let politicsArticles = await Article.find(
    polticsParams,
    {},
    { sort: { created_at: -1 } }
  ).limit(300);

  let opinionParams = {
    category: "opinion",
    title: { $regex: new RegExp(term, "i") },
    created_at: {
      $gte: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000)
    }
  };

  let opinionArticles = await Article.find(
    opinionParams,
    {},
    { sort: { created_at: -1 } }
  ).limit(100);

  return {
    politics: shuffle(politicsArticles),
    opinion: shuffle(opinionArticles),
    combined: shuffle([...politicsArticles, ...opinionArticles])
  };
};

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
