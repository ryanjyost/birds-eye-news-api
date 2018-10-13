const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  round: Number,
  nlp: {
    afinn: Number,
    senticon: Number,
    pattern: Number,
    sentiment: mongoose.Schema.Types.Mixed
  },
  site: {
    name: String,
    url: String,
    title: String
  },
  siteName: String,
  created_at: { type: Date, default: new Date() },
  // uploaded_at: String,
  title: String,
  summary: String,
  description: String,
  link: String,
  origLink: String,
  permaLink: String,
  date: String,
  pubate: String,
  author: mongoose.Schema.Types.Mixed,
  guid: { type: String, index: true, unique: true, required: true },
  categories: Array,
  source: mongoose.Schema.Types.Mixed
});

articleSchema.index({ title: "text", summary: "text", description: "text" });

module.exports = mongoose.model("article", articleSchema);
