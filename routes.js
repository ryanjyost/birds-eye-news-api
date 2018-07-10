const Record = require("./models/record.js");
const Batch = require("./models/batch.js");
const Round = require("./models/round.js");
const Article = require("./models/article.js");
const sites = require("./sites.js");

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
  }
];
