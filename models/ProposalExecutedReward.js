const mongoose = require("mongoose");

const ProposalExecutedRewardSchema = new mongoose.Schema(
  {
    proposalId: { type: Number},     // Fast lookups by proposal
    user: { type: String},           // Useful for tracking rewards by user
    reward: { type: Number },
    timestamp: { type: Number},      // For sorting/filtering by time
    txHash: { type: String }, // Ensures no duplicate transactions
    block: { type: Number },          // For queries based on block number
  },
  { timestamps: true, collection: "ProposalExecutedReward" }
);

module.exports = mongoose.model("ProposalExecutedReward", ProposalExecutedRewardSchema);
