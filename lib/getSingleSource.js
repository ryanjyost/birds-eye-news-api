const _lib = require("./helpers");
const striptags = require("striptags");
const Article = require("../models/article");
const Batch = require("../models/batch");
const BatchOfTags = require("../models/batchOfTags");
const moment = require("moment");
const getAverageTags = require("./getAverageTags");

module.exports = async function(source) {
  // politics articles from current source
  let politicsArticles = [];
  let hasPolitics = source.rss.find(feed => {
    return feed.category === "politics";
  });
  if (hasPolitics) {
    let params = {
      siteName: source.name,
      category: "politics",
      created_at: {
        $gte: new Date(new Date().getTime() - 300 * 24 * 60 * 60 * 1000)
      }
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

  // opinion articles from current source
  let opinionArticles = [];
  let hasOpinions = source.rss.find(feed => {
    return feed.category === "opinion";
  });
  if (hasOpinions) {
    let params = {
      siteName: source.name,
      category: "opinion",
      created_at: {
        $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      }
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
    // politicsText = politicsText + " " + striptags(article.title.trim());
  }

  for (let article of opinionArticles) {
    combinedText = combinedText + " " + striptags(article.title.trim());
    // opinionText = opinionText + " " + striptags(article.title.trim());
  }

  const topTagsCombined = _lib.getTopTagsFromText(combinedText);

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
    tag.percentageFreq = tag.sourceCount / combinedArticles.length;
  }

  const batches = await Batch.find(
    {
      "records.1": { $exists: true },
      created_at: {
        $gte: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000)
      }
    }, //make sure there's records in the batch
    {},
    { sort: { created_at: -1 } },

    function(err, batch) {
      return batch;
    }
  );

  /* ===================
	* Average tags from all sources
	*/
  let averageTags = await getAverageTags(25);
  /* ===================
	* Get unique tags
	*/

  /* ===================
 * Unique Tags
 */
  let uniqueTags = topTagsCombined.map(tag => {
    let foundTag = tag.term in averageTags;

    if (foundTag) {
      let diff =
        tag.sourceCount / combinedArticles.length - averageTags[tag.term];

      let percentageDiff =
        (tag.sourceCount / combinedArticles.length - averageTags[tag.term]) /
        ((tag.sourceCount / combinedArticles.length + averageTags[tag.term]) /
          2);

      return {
        ...{ ...tag, ...{ freq: tag.tf / combinedArticles.length } },
        ...{
          average: {
            ...{
              freq: averageTags[tag.term],
              diff,
              percentageDiff
            }
          }
        }
      };
    } else {
      return tag;
    }

    // if (foundTag) {
    //   console.log("============");
    //   console.log(tag.term);
    //   console.log(
    //     (tag.tf / combinedArticles.length).toFixed(2),
    //     (foundTag.tf / recentBatchOfTags.sourceCount).toFixed(2)
    //   );
    //   if (
    //     tag.tf / combinedArticles.length -
    //       foundTag.tf / recentBatchOfTags.sourceCount >
    //     0.05
    //   ) {
    //     return tag;
    //   } else {
    //     return null;
    //   }
    // } else {
    //   return tag;
    // }
  });

  let aboveAverage = uniqueTags.filter(tag => {
    if ("average" in tag) {
      return tag.average.diff > 0;
    } else {
      return true;
    }
  });

  /* ===================
 * Unique Tags
 */

  return {
    source: source,
    tags: topTagsCombined,
    aboveAverageTags: aboveAverage,
    sourceCount: combinedArticles.length,
    combinedArticles,
    batches
  };
};
