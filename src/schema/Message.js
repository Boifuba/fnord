const { Schema, model, models } = require("mongoose");

const messageSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  messages: [
    {
      index: {
        type: Number,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

// Verifica se o modelo já existe antes de criá-lo
module.exports = models.Mural || model("Mural", messageSchema);
