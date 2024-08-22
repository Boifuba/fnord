const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userId: { type: String, require: true, unique: true },
  serverId: { type: String, require: true },
  balance: { type: Number, default: 1 },
  campanha: { type: String, require: true },
  user: { type: String, require: true },
});

const model = mongoose.model("xp", profileSchema, "xp");

module.exports = model;
