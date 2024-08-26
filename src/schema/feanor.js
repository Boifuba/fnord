const { Schema, model } = require("mongoose");

const feanorSchema = new Schema({
  ofensa: {
    type: String,
    required: true,
  },
});

module.exports = model("Feanor", feanorSchema);
