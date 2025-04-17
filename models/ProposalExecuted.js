const mongoose = require("mongoose");

const ProposalExecutedSchema = new mongoose.Schema(
  {
    proposalId: { type: Number },
    isPassed: { type: Boolean },
    timestamp: { type: Number },
    txHash: { type: String},
    block: { type: Number },
  },
  { timestamps: true, collection: "ProposalExecuted" }
);
module.exports = mongoose.model("ProposalExecuted", ProposalExecutedSchema);
