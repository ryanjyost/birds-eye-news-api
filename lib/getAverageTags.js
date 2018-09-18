const BatchOfTags = require("../models/batchOfTags");
const ss = require("simple-statistics");

module.exports = async function(days) {
  let batches = [];
  for (let i = 0; i < days; i++) {
    let batch = await BatchOfTags.findOne(
      {
        created_at: {
          $lte: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000)
        }
      },
      {},
      { sort: { created_at: -1 } },

      function(err, batch) {
        return batch;
      }
    );

    batches.push(batch);
  }

  let avgTagFrequencies = {};
  for (let batch of batches) {
    if (batch) {
      for (let tag of batch.tags) {
        if (tag.term in avgTagFrequencies) {
          if (tag.sourceCount / batch.sourceCount) {
            avgTagFrequencies[tag.term] = [
              ...avgTagFrequencies[tag.term],
              ...[tag.sourceCount / batch.sourceCount]
            ];
          }
        } else {
          avgTagFrequencies[tag.term] = [tag.sourceCount / batch.sourceCount];
        }
      }
    }
  }

  function createArrayOfZeros(num) {
    let array = [];
    for (let i = 0; i < num; i++) {
      array.push(0);
    }

    return array;
  }

  for (let term in avgTagFrequencies) {
    let fullLengthArray = [
      ...avgTagFrequencies[term],
      ...createArrayOfZeros(batches.length - avgTagFrequencies[term].length)
    ];

    avgTagFrequencies[term] = ss.mean(fullLengthArray);
    // avgTagFrequencies[term] = fullLengthArray;
  }

  return avgTagFrequencies;
};

// module.exports = async function() {
//   // politics articles from current source
//   let allArticles = [];
//
//   let params = {
//     created_at: {
//       $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
//     }
//   };
//
//   let articles = await Article.find(
//     params,
//     {},
//     { sort: { created_at: -1 } },
//     function(err, articles) {
//       return articles;
//     }
//   );
//
//   allArticles = allArticles.concat(articles);
//
//   let combinedText = "";
//
//   for (let article of allArticles) {
//     combinedText = combinedText + " " + striptags(article.title.trim());
//     // politicsText = politicsText + " " + striptags(article.title.trim());
//   }
//
//   console.log("ARTICLE COUNT", allArticles.length);
//
//   const topTagsCombined = _lib.getTopTagsFromText(combinedText);
//
//   for (let tag of topTagsCombined) {
//     // console.log(combinedArticles.length);
//     let combinedText = "",
//       articleCount = 0;
//     allArticles.map(article => {
//       // console.log(article.title);
//       if (article.title.toLowerCase().includes(tag.term)) {
//         combinedText = combinedText + " " + striptags(article.title.trim());
//         articleCount++;
//       }
//     });
//
//     const tags = _lib.getTopTagsFromText(combinedText, 3);
//     tag.related = tags || [];
//     tag.sourceCount = articleCount;
//     tag.percentageFreq = tag.sourceCount / allArticles.length;
//   }
//
//   return {
//     topTagsCombined
//   };
// };
