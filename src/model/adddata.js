const mongoose = require("mongoose");
const answer = new mongoose.Schema(
  {

    name: {
      type: String,
      default: "no name",
    },

    price: {
      type: Number,
      default: "no number",
    },
    category: {
      type: String,
      default: null,
    },
    

    duration: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("service", answer);
