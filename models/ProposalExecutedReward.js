const mongoose = require("mongoose");

const ProposalExecutedRewardSchema = new mongoose.Schema(
  {
    proposalId: { type: Number },
    user: { type: String },
    reward: { type: Number },
    timestamp: { type: Number },
    txHash: { type: String},
    block: { type: Number },
  },
  { timestamps: true, collection: "ProposalExecutedReward" }
);
module.exports = mongoose.model("ProposalExecutedReward", ProposalExecutedRewardSchema);
