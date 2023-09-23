const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  usedWords: [
    {
      word: { type: String, required: true },
      count: { type: Number, default: 1 },
    },
  ],
});

const UserModel = mongoose.model("words", WordSchema);

module.exports = { UserModel };
