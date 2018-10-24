const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  created_at: { type: Date, default: new Date() },
  uid: String,
  type: String,
  value: String
});

module.exports = mongoose.model("feedback", feedbackSchema);
