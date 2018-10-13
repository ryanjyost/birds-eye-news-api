const BatchOfTags = require("../models/batchOfTags.js");

module.exports = async function() {
  const batches = await getBatches();

  let object = {};
  for (let batch of batches) {
    for (let tag of batch.tags) {
      if (tag.sourceCount / batch.sourceCount > 0.03) {
        if (tag.term in object) {
          object[tag.term] = object[tag.term] + tag.sourceCount;
        } else {
          object[tag.term] = tag.sourceCount;
        }
      }
    }
  }

  const array = [];
  for (let item in object) {
    array.push({
      term: item,
      total: object[item],
      avg: object[item] / batches.length
    });
  }

  return { terms: array };
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
