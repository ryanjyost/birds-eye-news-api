const sites = require("../sites.js");
const Article = require("../models/article.js");
const gramophone = require("gramophone");
const striptags = require("striptags");

module.exports = async function(request, h) {
  let politicsArticles = [];

  for (let site of sites) {
    let hasPolitics = site.rss.find(feed => {
      return feed.category === "politics";
    });
    if (hasPolitics) {
      let params = { siteName: site.name, category: "politics" };
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

  let allArticles = [...politicsArticles, ...opinionArticles];

  let combinedText = "";

  for (let article of allArticles) {
    combinedText = combinedText + " " + striptags(article.title.trim());
    // " " +
    // striptags(article.summary.trim());
  }

  let termsToSkip = ["make", "report", "close", "this", "call", "president"];

  const frequencies = gramophone.extract(combinedText, {
    score: true,
    min: 5,
    stem: false,
    stopWords: termsToSkip
  });

  const topTags = frequencies.filter(tag => {
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
  });

  return { sites, politicsArticles, opinionArticles, topTags };
};
