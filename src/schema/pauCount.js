const { Schema, model } = require("mongoose");

const pauSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  lastAccident: {
    type: Date,
    required: true,
    default: Date.now, // Define a data atual como padrão
  },
});

module.exports = model("ContadorDePau", pauSchema);
