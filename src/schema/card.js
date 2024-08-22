const { Schema, model } = require("mongoose");

const cardsSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  cards: {
    type: Number,
    required: true,
  },
  lastRoleAdded: {
    type: Date, // Campo para armazenar a data da última vez que o cargo foi adicionado
  },
});

module.exports = model("Cards", cardsSchema);
