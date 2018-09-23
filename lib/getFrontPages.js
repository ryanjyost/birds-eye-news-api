const Batch = require("../models/batch.js");
const Record = require("../models/record.js");
const sites = require("../sites");

module.exports = async function(request, h) {
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

  return { records, batch, sites };
};
