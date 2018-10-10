const BatchOfTags = require("../models/batchOfTags");
const ss = require("simple-statistics");
const moment = require("moment");

module.exports = async function(days) {
  return await getBatches();
};

const getBatches = async () => {
  // find one batch each day of past month
  let monthlyBatches = [];
  for (let i = 34; i > 0; i--) {
    let batch = await BatchOfTags.findOne(
      {
        created_at: {
          $gte: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000),
          $lt: new Date(new Date().getTime() - (i - 1) * 24 * 60 * 60 * 1000)
        }
      },
      { created_at: 1, sourceCount: 1, tags: 1 },
      { sort: { created_at: -1 } },

      function(err, batch) {
        return batch;
      }
    );

    monthlyBatches.push(batch);
  }

  let weeklyBatches = [];
  for (let i = 28; i > 0; i--) {
    let batch = await BatchOfTags.findOne(
      {
        created_at: {
          $gte: new Date(new Date().getTime() - i * 12 * 60 * 60 * 1000),
          $lt: new Date(new Date().getTime() - (i - 1) * 12 * 60 * 60 * 1000)
        }
      },
      { created_at: 1, sourceCount: 1, tags: 1 },
      { sort: { created_at: -1 } },

      function(err, batch) {
        return batch;
      }
    );

    weeklyBatches.push(batch);
  }

  const dailyBatches = await BatchOfTags.find(
    {
      created_at: {
        $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        $lt: new Date(new Date().getTime())
      }
    },
    { created_at: 1, sourceCount: 1, tags: 1 },
    { sort: { created_at: -1 } },

    function(err, batch) {
      return batch;
    }
  );

  // prep data for up/down arrow representation
  const recentBatch = dailyBatches[0];
  const threeHours = await getComparisons(
    recentBatch,
    dailyBatches,
    "hours",
    3
  );
  const twelveHours = await getComparisons(
    recentBatch,
    dailyBatches,
    "hours",
    12
  );
  const day = await getComparisons(recentBatch, weeklyBatches, "days", 1);
  const week = await getComparisons(recentBatch, weeklyBatches, "days", 7);
  const month = await getComparisons(recentBatch, monthlyBatches, "days", 30);

  return {
    batches: {
      monthly: monthlyBatches,
      weekly: weeklyBatches,
      today: dailyBatches
    },
    comparisons: {
      threeHours,
      twelveHours,
      day,
      week,
      month
    }
  };
};

const getComparisons = async (
  recentBatch,
  batchesToSearch,
  units,
  unitsAgo
) => {
  let prevBatch = batchesToSearch.find(batch => {
    return (
      Math.abs(
        moment(batch.created_at).diff(moment(recentBatch.created_at), units)
      ) === unitsAgo
    );
  });

  if (!prevBatch) {
    prevBatch = batchesToSearch.find(batch => {
      return (
        Math.abs(
          moment(batch.created_at).diff(moment(recentBatch.created_at), units)
        ) >=
          unitsAgo - 1 &&
        Math.abs(
          moment(batch.created_at).diff(moment(recentBatch.created_at), units)
        ) <=
          unitsAgo + 1
      );
    });
  }

  let combined = recentBatch.tags.map(tag => {
    let match = prevBatch.tags.find(tag2 => {
      return tag.term === tag2.term;
    });

    if (match) {
      let diff =
        (tag.sourceCount / recentBatch.sourceCount -
          match.sourceCount / prevBatch.sourceCount) /
        (match.sourceCount / prevBatch.sourceCount);

      return {
        tag: { ...tag, ...{ freq: tag.sourceCount / recentBatch.sourceCount } },
        match: {
          ...match,
          ...{ freq: match.sourceCount / prevBatch.sourceCount }
        },
        diff: diff * 100
      };
    } else {
      return {
        tag: { ...tag, ...{ freq: tag.sourceCount / recentBatch.sourceCount } },
        match: null
      };
    }
  });

  let positive = [],
    neutral = [],
    negative = [],
    graveyard = [],
    brandNew = [];

  for (let item of combined) {
    if (!item.match) {
      brandNew.push(item);
    } else if (item.diff > 1) {
      positive.push(item);
    } else if (item.diff < -1) {
      negative.push(item);
    } else {
      neutral.push(item);
    }
  }

  return {
    prevBatch,
    positive,
    neutral,
    negative,
    graveyard,
    brandNew
  };
};
