const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectId;
let answer = new Schema(
  {
    service_id: ObjectId,
     
    service_name: {
        type: String,
        default: "no name",
      },
      transaction_id:{
         type:String,
         deafault:null
      },
    amount: {
      type: Number,
      default: "no email",
    },
    category: {
      type: String,
      default: null,
    },
    user_id:ObjectId
        
  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("transaction", answer);
