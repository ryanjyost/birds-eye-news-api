const Record = require("./models/record.js");
const Batch = require("./models/batch.js");
const Round = require("./models/round.js");
const Article = require("./models/article.js");
const BatchOfTags = require("./models/batchOfTags.js");
const sites = require("./sites.js");
const _ = require("lodash");
const striptags = require("striptags");
const gramophone = require("gramophone");
const nlp = require("compromise");
const getSingleSource = require("./lib/getSingleSource");
const chyrons = require("./lib/chyrons");
const topNews = require("./lib/topNews");
const Boom = require("boom");
const camelCase = require("camelcase");

const handleRequest = async (request, args) => {
  let { redis } = request.server.app;
  let key = request.route.path.replace("/", "_");
  if (key.indexOf("/") > -1) {
    key = key.slice(0, key.indexOf("/"));
  }

  try {
    let data = await redis.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      data = await request.server.methods[camelCase(key)].apply(this, args);
      redis.set(key, JSON.stringify(data), "EX", 60 * 15);
      return data;
    }
  } catch (e) {
    return Boom.badImplementation(e);
  }
};

module.exports = [
  /*======================
  * GET_FRONT_PAGES
  * */
  {
    method: "GET",
    path: "/get_front_pages",
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* RECENT_TAGS
	* */
  {
    method: "GET",
    path: "/recent_tags",
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* TODAY
	* */
  {
    method: "GET",
    path: "/recent_articles",
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* ARTICLES
	* */
  {
    method: "GET",
    path: "/articles",
    handler: async function(request, h) {
      let param = {
        created_at: {
          $gte: Date.parse(request.query.start),
          $lt: Date.parse(request.query.end)
        }
      };
      let articles = await Article.find(param, function(err, articles) {
        return articles;
      }).limit(100);

      return { articles };
    }
  },

  /*======================
	* SEARCH_FRONT_PAGES
	* */
  {
    method: "GET",
    path: "/search_front_pages",
    handler: async function(request, h) {
      // BATCH
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

      return { batches, sites };
    }
  },

  /*======================
* SOURCES
* */
  {
    method: "GET",
    path: "/sources",
    handler: async function(request, h) {
      return { sources: sites };
    }
  },

  /*======================
* Single Source
* */
  {
    method: "GET",
    path: `/sources/{source}`,
    handler: async function(request, h) {
      // source info
      let source = sites.find(site => {
        return site.name === request.params.source;
      });

      return getSingleSource(source);

      // if (data) {
      //   return { ...source, ...data };
      // }
    }
  },

  /*======================
* Chyrons
* */
  {
    method: "GET",
    path: `/chyrons/{hours}`,
    handler: async function(request, h) {
      return await handleRequest(request, [request.params.hours]);
    }
  },

  {
    method: "GET",
    path: `/top_news`,
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
* New
* */
  {
    method: "GET",
    path: `/test/{a}/{b}`,
    handler: async function(request, h) {
      let { a, b } = request.params;
      let { redis } = request.server.app;

      try {
        let test = await redis.get(`${a}_${b}`);
        if (test) {
          console.log("found!");
          return test;
        } else {
          console.log("new");
          redis.set(`${a}_${b}`, a + b, "EX", 60 * 15);
          return a + b;
        }

        return h
          .response({
            test
          })
          .code(201);
      } catch (e) {
        return Boom.badImplementation(e);
      }
    }
  }
];

// {
// 	method: "GET",
// 		path: "/get_recent",
// 	handler: async function(request, h) {
// 	const batch = await Batch.findOne(
// 		{ "records.1": { $exists: true } }, //make sure there's records in the batch
// 		{},
// 		{ sort: { created_at: -1 } },
//
// 		function(err, batch) {
// 			return batch;
// 		}
// 	);
//
// 	const params = { batch: Number(batch.id) };
// 	const records = await Record.find(params, function(err, records) {
// 		return records;
// 	});
//
// 	return { records, batch };
// }
// },

// {
// 	method: "GET",
// 		path: "/get_headlines",
// 	handler: async function(request, h) {
// 	const round = await Round.findOne(
// 		{ "tags.1": { $exists: true } }, //make sure there's records in the batch
// 		{},
// 		{ sort: { created_at: -1 } },
//
// 		function(err, round) {
// 			return round;
// 		}
// 	);
//
// 	let allArticles = [];
//
// 	for (let site of sites) {
// 		let params = { siteName: site.name };
// 		let articles = await Article.find(params, function(err, articles) {
// 			return articles;
// 		}).limit(20);
//
// 		allArticles = allArticles.concat(articles);
// 	}
//
// 	// let articlesByTags = {};
// 	// const tags = round.tags.slice(0, 20);
// 	//
// 	// for (let tag of tags) {
// 	//   let filteredArticles = allArticles.filter(item => {
// 	//     let allText = item.title + " " + item.description;
// 	//     let cleanText = allText
// 	//       .toLowerCase()
// 	//       .replace(/[,\/#!$%\^&\*;:{}=_`~()]/g, "");
// 	//
// 	//     let titleWithoutHyphens = cleanText.replace("-", " ");
// 	//
// 	//     return (
// 	//       cleanText.includes(tag.term) ||
// 	//       titleWithoutHyphens.includes(tag.term)
// 	//     );
// 	//   });
// 	//
// 	//   articlesByTags[tag.term] = filteredArticles;
// 	// }
//
// 	return { round, articles: allArticles };
// }
// },

// {
// 	method: "GET",
// 		path: "/get_latest",
// 	handler: async function(request, h) {
// 	const round = await Round.findOne(
// 		{ "tags.1": { $exists: true } }, //make sure there's records in the batch
// 		{},
// 		{ sort: { created_at: -1 } },
//
// 		function(err, round) {
// 			return round;
// 		}
// 	);
//
// 	let politicsArticles = [];
//
// 	for (let site of sites) {
// 		let params = { siteName: site.name, category: "politics" };
// 		let articles = await Article.find(params, function(err, articles) {
// 			return articles;
// 		}).limit(20);
//
// 		politicsArticles = politicsArticles.concat(articles);
// 	}
//
// 	let opinionArticles = [];
//
// 	for (let site of sites) {
// 		let params = { siteName: site.name, category: "opinion" };
// 		let articles = await Article.find(params, function(err, articles) {
// 			return articles;
// 		}).limit(20);
//
// 		opinionArticles = opinionArticles.concat(articles);
// 	}
//
// 	// let articlesByTags = {};
// 	// const tags = round.tags.slice(0, 20);
// 	//
// 	// for (let tag of tags) {
// 	//   let filteredArticles = allArticles.filter(item => {
// 	//     let allText = item.title + " " + item.description;
// 	//     let cleanText = allText
// 	//       .toLowerCase()
// 	//       .replace(/[,\/#!$%\^&\*;:{}=_`~()]/g, "");
// 	//
// 	//     let titleWithoutHyphens = cleanText.replace("-", " ");
// 	//
// 	//     return (
// 	//       cleanText.includes(tag.term) ||
// 	//       titleWithoutHyphens.includes(tag.term)
// 	//     );
// 	//   });
// 	//
// 	//   articlesByTags[tag.term] = filteredArticles;
// 	// }
//
// 	return {
// 		round,
// 		articles: { politics: politicsArticles, opinion: opinionArticles }
// 	};
// }
// },

// {
// 	method: "GET",
// 		path: "/now",
// 	handler: async function(request, h) {
// 	let politicsArticles = [];
//
// 	for (let site of sites) {
// 		let hasPolitics = site.rss.find(feed => {
// 			return feed.category === "politics";
// 		});
// 		if (hasPolitics) {
// 			let params = { siteName: site.name, category: "politics" };
// 			let articles = await Article.find(
// 				params,
// 				{},
// 				{ sort: { created_at: -1 } },
// 				function(err, articles) {
// 					return articles;
// 				}
// 			).limit(10);
//
// 			politicsArticles = politicsArticles.concat(articles);
// 		}
// 	}
//
// 	let opinionArticles = [];
//
// 	for (let site of sites) {
// 		let hasOpinions = site.rss.find(feed => {
// 			return feed.category === "opinion";
// 		});
// 		if (hasOpinions) {
// 			let params = { siteName: site.name, category: "opinion" };
// 			let articles = await Article.find(
// 				params,
// 				{},
// 				{ sort: { created_at: -1 } },
// 				function(err, articles) {
// 					return articles;
// 				}
// 			).limit(10);
//
// 			opinionArticles = opinionArticles.concat(articles);
// 		}
// 	}
//
// 	let allArticles = [...politicsArticles, ...opinionArticles];
//
// 	let combinedText = "";
//
// 	for (let article of allArticles) {
// 		combinedText = combinedText + " " + striptags(article.title.trim());
// 		// " " +
// 		// striptags(article.summary.trim());
// 	}
//
// 	let termsToSkip = [
// 		"make",
// 		"report",
// 		"close",
// 		"this",
// 		"call",
// 		"president"
// 	];
//
// 	const frequencies = gramophone.extract(combinedText, {
// 		score: true,
// 		min: 5,
// 		stem: false,
// 		stopWords: termsToSkip
// 	});
//
// 	const topTags = frequencies.filter(tag => {
// 		const termArray = tag.term.split(" ");
// 		let tooShort = false;
// 		if (termArray.length > 1) {
// 			tooShort = termArray.find(term => {
// 				return term.length < 2;
// 			});
// 		} else {
// 			tooShort = tag.term.length < 4;
// 		}
//
// 		if (tooShort) {
// 			return false;
// 		} else if (termsToSkip.includes(tag.term.toLowerCase())) {
// 			return false;
// 		} else {
// 			return tag.tf >= 5;
// 		}
// 	});
//
// 	return { sites, politicsArticles, opinionArticles, topTags };
// }
// },
