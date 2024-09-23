// src/schema/monarkSchema.js
const mongoose = require("mongoose");

const monarkSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1 },
  user: { type: String, required: true },
});

// Verifique se o modelo já foi definido
const Monark = mongoose.models.Monark || mongoose.model("Monark", monarkSchema);

module.exports = Monark;
