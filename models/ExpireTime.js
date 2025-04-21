const mongoose = require("mongoose");

const ExpireTime = new mongoose.Schema(
  {
    newExpireTime: { type: Number, required: true },
    timestamp: { type: Number, required: true, index: true },         // For sorting/filtering by time
    txHash: { type: String, required: true, unique: true, index: true }, // Ensures unique transaction and fast lookup
    block: { type: Number, required: true, index: true },             // For querying by block number
  },
  { timestamps: true, collection: "expiretime" }
);

module.exports = mongoose.model("expiretime", ExpireTime);
