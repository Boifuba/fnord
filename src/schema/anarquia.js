const { Schema, model } = require("mongoose");

const anarquiaSchema = new Schema({
  estado: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("Anarquia", anarquiaSchema);
