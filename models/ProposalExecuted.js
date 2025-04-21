const mongoose = require("mongoose");

const ProposalExecutedSchema = new mongoose.Schema(
  {
    proposalId: { type: Number, index: true }, // Index for faster lookup
    isPassed: { type: Boolean, index: true }, // Index for filtering passed/failed proposals
    timestamp: { type: Number, index: true }, // Useful for sorting or range queries
    txHash: { type: String, unique: true, index: true }, // Index and ensure uniqueness
    block: { type: Number, index: true }, // Index if often queried by block
  },
  { timestamps: true, collection: "ProposalExecuted" }
);

module.exports = mongoose.model("ProposalExecuted", ProposalExecutedSchema);
