const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  quotes: [{ type: String }],
});

module.exports = mongoose.model("Quote", quoteSchema);
