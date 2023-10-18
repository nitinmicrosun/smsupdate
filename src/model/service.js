const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answer = new Schema(
  {
    service_name: {
      type: String,
      default: "no name",
    },

    service_price: {
      type: Number,
      default: "no email",
    },
    category: {
      type: String,
      default: null,
    },
    user_count: {
      type: Number,
      default: null,
    },

    start_time: {
      type: Date,
      default: null,
    },
    end_time: {
        type: Date,
        default: null,
      },
      duration:{
        type: Number,
      }
  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("service", answer);
