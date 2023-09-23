const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userId: { type: String, require: true, unique: true },
  serverId: { type: String, require: true },
  balance: { type: Number, default: 1 },
  campanha: { type: String, require: true },
  pontos: { type: Number, default: 1 },
});

const model = mongoose.model("beahdb", profileSchema);

module.exports = model;
