const mongoose = require("mongoose");

const UnStakes = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },            // For querying unstakes by user
    amount: { type: Number, required: true },
    timestamp: { type: Number, required: true, index: true },       // For time-based queries
    txHash: { type: String, required: true, unique: true, index: true }, // To prevent duplicates & for fast lookup
    block: { type: Number, required: true, index: true },           // For queries based on block
  },
  { timestamps: true, collection: "UnStake" }
);

module.exports = mongoose.model("UnStake", UnStakes);
