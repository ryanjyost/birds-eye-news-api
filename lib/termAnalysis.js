const Article = require("../models/article.js");
const getTopic = require("./getSingleTopic");
const BatchOfTags = require("../models/batchOfTags.js");
const shuffle = require("shuffle-array");
const gramophone = require("gramophone");
const striptags = require("striptags");

module.exports = async function(term) {
  let articles = await getArticles(term);
  const batches = await getBatches();

  let combinedText = "";
  for (let article of articles.combined) {
    combinedText = combinedText + " " + striptags(article.title.trim());
  }

  const topTagsCombined = getTopTagsFromText(combinedText);
  let filteredRelated = topTagsCombined.filter(tag => {
    return tag.term !== term;
  });

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

  return { articles, batches, topic, related: filteredRelated };
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

let termsToSkip = [
  "make",
  "report",
  "close",
  "this",
  "call",
  "president",
  "back",
  "u2019s",
  "u2014"
];

const filterTags = tag => {
  const termArray = tag.term.split(" ");
  let tooShort = false;
  if (termArray.length > 1) {
    tooShort = termArray.find(term => {
      return term.length < 2;
    });
  } else {
    tooShort = tag.term.length < 4;
  }

  if (tooShort) {
    return false;
  } else if (termsToSkip.includes(tag.term.toLowerCase())) {
    return false;
  } else {
    return tag.tf >= 5;
  }
};

const getTopTagsFromText = (text, min = 5) => {
  const combinedFrequencies = gramophone.extract(text, {
    score: true,
    min: min,
    stem: false,
    stopWords: termsToSkip
  });

  return combinedFrequencies.filter(filterTags);
};
