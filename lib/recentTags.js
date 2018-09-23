const BatchOfTags = require("../models/batchOfTags.js");
const moment = require("moment");

module.exports = async function(request, h) {
  const batches = await BatchOfTags.find(
    {},
    {},
    { sort: { created_at: -1 } },

    function(err, batch) {
      return batch;
    }
  ).limit(24 * 4);

  let sorted = batches.sort((a, b) => {
    if (moment(a.created_at).isAfter(moment(b.created_at))) {
      return -1;
    } else if (moment(b.created_at).isAfter(moment(a.created_at))) {
      return 1;
    } else {
      return 0;
    }
  });

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

  return { batches: sorted, topTags };
};
