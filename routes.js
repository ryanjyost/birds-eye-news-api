const Record = require("./models/record.js");
const Batch = require("./models/batch.js");

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
  }
];
