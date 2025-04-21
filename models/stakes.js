const mongoose = require("mongoose");

const Stakes = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },            // Index for querying user stakes
    amount: { type: Number, required: true },
    timestamp: { type: Number, required: true, index: true },       // Index for time-based queries
    txHash: { type: String, required: true, unique: true, index: true }, // Unique and indexed for fast lookup
    block: { type: Number, required: true, index: true },           // Index if filtering or sorting by block
  },
  { timestamps: true, collection: "Stake" }
);

module.exports = mongoose.model("Stake", Stakes);
