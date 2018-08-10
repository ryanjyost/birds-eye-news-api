const Record = require("./models/record.js");
const Batch = require("./models/batch.js");
const Round = require("./models/round.js");
const Article = require("./models/article.js");
const sites = require("./sites.js");
var _ = require("lodash");
const striptags = require("striptags");
const gramophone = require("gramophone");
var nlp = require("compromise");

module.exports = [
  {
    method: "GET",
    path: "/get_recent",
    handler: async function(request, h) {
      const batch = await Batch.findOne(
        { "records.1": { $exists: true } }, //make sure there's records in the batch
        {},
        { sort: { created_at: -1 } },

        function(err, batch) {
          return batch;
        }
      );

      const params = { batch: Number(batch.id) };
      const records = await Record.find(params, function(err, records) {
        return records;
      });

      return { records, batch };
    }
  },
  {
    method: "GET",
    path: "/get_headlines",
    handler: async function(request, h) {
      const round = await Round.findOne(
        { "tags.1": { $exists: true } }, //make sure there's records in the batch
        {},
        { sort: { created_at: -1 } },

        function(err, round) {
          return round;
        }
      );

      let allArticles = [];

      for (let site of sites) {
        let params = { siteName: site.name };
        let articles = await Article.find(params, function(err, articles) {
          return articles;
        }).limit(20);

        allArticles = allArticles.concat(articles);
      }

      // let articlesByTags = {};
      // const tags = round.tags.slice(0, 20);
      //
      // for (let tag of tags) {
      //   let filteredArticles = allArticles.filter(item => {
      //     let allText = item.title + " " + item.description;
      //     let cleanText = allText
      //       .toLowerCase()
      //       .replace(/[,\/#!$%\^&\*;:{}=_`~()]/g, "");
      //
      //     let titleWithoutHyphens = cleanText.replace("-", " ");
      //
      //     return (
      //       cleanText.includes(tag.term) ||
      //       titleWithoutHyphens.includes(tag.term)
      //     );
      //   });
      //
      //   articlesByTags[tag.term] = filteredArticles;
      // }

      return { round, articles: allArticles };
    }
  },
  {
    method: "GET",
    path: "/get_front_pages",
    handler: async function(request, h) {
      // BATCH
      const batch = await Batch.findOne(
        { "records.1": { $exists: true } }, //make sure there's records in the batch
        {},
        { sort: { created_at: -1 } },

        function(err, batch) {
          return batch;
        }
      );

      const recordParams = { batch: Number(batch.id) };
      const records = await Record.find(recordParams, function(err, records) {
        return records;
      });

      return { records, batch };
    }
  },
  {
    method: "GET",
    path: "/get_latest",
    handler: async function(request, h) {
      const round = await Round.findOne(
        { "tags.1": { $exists: true } }, //make sure there's records in the batch
        {},
        { sort: { created_at: -1 } },

        function(err, round) {
          return round;
        }
      );

      let politicsArticles = [];

      for (let site of sites) {
        let params = { siteName: site.name, category: "politics" };
        let articles = await Article.find(params, function(err, articles) {
          return articles;
        }).limit(20);

        politicsArticles = politicsArticles.concat(articles);
      }

      let opinionArticles = [];

      for (let site of sites) {
        let params = { siteName: site.name, category: "opinion" };
        let articles = await Article.find(params, function(err, articles) {
          return articles;
        }).limit(20);

        opinionArticles = opinionArticles.concat(articles);
      }

      // let articlesByTags = {};
      // const tags = round.tags.slice(0, 20);
      //
      // for (let tag of tags) {
      //   let filteredArticles = allArticles.filter(item => {
      //     let allText = item.title + " " + item.description;
      //     let cleanText = allText
      //       .toLowerCase()
      //       .replace(/[,\/#!$%\^&\*;:{}=_`~()]/g, "");
      //
      //     let titleWithoutHyphens = cleanText.replace("-", " ");
      //
      //     return (
      //       cleanText.includes(tag.term) ||
      //       titleWithoutHyphens.includes(tag.term)
      //     );
      //   });
      //
      //   articlesByTags[tag.term] = filteredArticles;
      // }

      return {
        round,
        articles: { politics: politicsArticles, opinion: opinionArticles }
      };
    }
  },

  {
    method: "GET",
    path: "/today",
    handler: async function(request, h) {
      let politicsArticles = [];

      for (let site of sites) {
        if (site.name !== "thehill" && site.name !== "politico") {
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
        if (site.name !== "thehill") {
          console.log(site.name);
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

      let termsToSkip = [
        "make",
        "report",
        "close",
        "this",
        "call",
        "president"
      ];

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
    }
  }
];
