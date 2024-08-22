const { Schema, model } = require("mongoose");

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

module.exports = model("Mural", messageSchema);
