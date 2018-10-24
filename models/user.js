const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  created_at: { type: Date, default: new Date() },
  firebase: mongoose.Schema.Types.Mixed,
  mailchimp: Boolean
});

module.exports = mongoose.model("user", userSchema);
