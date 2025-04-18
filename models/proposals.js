const mongoose = require("mongoose");

const Proposals = new mongoose.Schema(
  {
    user: { type: String, index: true }, // Index for faster user-based lookups
    proposalId: { type: Number, unique: true, index: true }, // Unique index for proposalId
    name: { type: String },
    ipfshash: { type: String, index: true }, // Index for IPFS hash queries
    startTime: { type: Number },
    endTime: { type: Number },
    timestamp: { type: Number, index: true }, // Helpful for sorting/filtering
    txHash: { type: String, unique: true, index: true }, // Ensures uniqueness and quick search
    block: { type: Number },
  },
  { timestamps: true, collection: "proposal" }
);

// Compound index example (optional)
// Proposals.index({ user: 1, timestamp: -1 }); // Uncomment if you want to optimize user+timestamp queries

module.exports = mongoose.model("proposal", Proposals);

