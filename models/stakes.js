const mongoose = require("mongoose");

const Stakes = new mongoose.Schema(
  {
    user: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true, unique: true },
    block: { type: Number, required: true },
  },
  { timestamps: true, collection: "Stake" }
);
module.exports = mongoose.model("Stake", Stakes);
