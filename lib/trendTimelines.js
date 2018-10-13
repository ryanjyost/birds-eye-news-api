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

  const dayGraphData = prepTopWordTrendData(dailyBatches);

  return {
    batches: {
      monthly: monthlyBatches,
      weekly: weeklyBatches,
      today: dailyBatches
    },
    graphData: {
      dayGraphData
    }
  };
};

const prepTopWordTrendData = batches => {
  // let filtered = batches.filter((batch, i) => {
  //   return (i + 7) % factor === 0 || i === 0;
  // });

  let dataKeys = batches[0].tags
    .sort((a, b) => {
      if (moment(a.sourceCount).isAfter(moment(b.sourceCount))) {
        return -1;
      } else if (moment(b.sourceCount).isAfter(moment(a.sourceCount))) {
        return 1;
      } else {
        return 0;
      }
    })
    .slice(0, 4)
    .map(tag => {
      return tag.term;
    });

  let data = batches.map(batch => {
    let obj = {
      time_stamp: -nearestHour(batch.created_at)
    };

    for (let i = 0; i < batch.tags.length; i++) {
      if (dataKeys.indexOf(batch.tags[i].term) > -1) {
        obj[batch.tags[i].term] =
          (batch.tags[i].sourceCount / batch.sourceCount) * 100;
      }
    }

    for (let item of dataKeys) {
      if (!(item in obj)) {
        obj[item] = 0;
      }
    }

    return obj;
  });

  return data;
};

const nearestHour = time => {
  return moment.duration(moment().diff(moment(time))).asHours();
};
