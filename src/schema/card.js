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
  totalCards: {
    type: Number,
    required: true,
  },
  lastRoleAdded: {
    type: Date,
  },
  reasons: [
    {
      reason: {
        type: String,
        required: true,
      },
      timestamp: {
        // Certifique-se de que o timestamp é incluído aqui
        type: Date,
        required: false,
      },
    },
  ], // Array para armazenar os motivos dos cartões
});

module.exports = model("Cards", cardsSchema);
