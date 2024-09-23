const mongoose = require("mongoose");

const presenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  displayName: { type: String, required: true },
});

// Verifique se o modelo já foi definido
const Presence =
  mongoose.models.Presence || mongoose.model("Presence", presenceSchema);

module.exports = Presence;
