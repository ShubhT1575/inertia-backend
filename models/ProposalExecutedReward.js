const mongoose = require("mongoose");

const ProposalExecutedRewardSchema = new mongoose.Schema(
  {
    proposalId: { type: Number, index: true },     // Fast lookups by proposal
    user: { type: String, index: true },           // Useful for tracking rewards by user
    reward: { type: Number },
    timestamp: { type: Number, index: true },      // For sorting/filtering by time
    txHash: { type: String, unique: true, index: true }, // Ensures no duplicate transactions
    block: { type: Number, index: true },          // For queries based on block number
  },
  { timestamps: true, collection: "ProposalExecutedReward" }
);

module.exports = mongoose.model("ProposalExecutedReward", ProposalExecutedRewardSchema);
