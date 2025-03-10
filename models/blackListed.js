const mongoose = require("mongoose");

const Blacklisted = new mongoose.Schema(
  {
    user: { type: String, required: true },
    isBlocked: { type:Boolean, required: true },
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true, unique: true },
    block: { type: Number, required: true },
  },
  { timestamps: true, collection: "blacklist" }
);
module.exports = mongoose.model("blacklist", Blacklisted);
