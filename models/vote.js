const mongoose = require("mongoose");

const Votes = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },              // Querying votes by user
    proposalId: { type: Number, required: true, index: true },        // Querying votes per proposal
    voteAmount: { type: Number, required: true },
    isYes: { type: Boolean, required: true, index: true },            // Filtering by vote type
    timestamp: { type: Number, required: true, index: true },         // Sorting/filtering by time
    txHash: { type: String, required: true, unique: true, index: true }, // Unique per vote
    block: { type: Number, required: true, index: true },             // Useful for blockchain-based filtering
  },
  { timestamps: true, collection: "votes" }
);

module.exports = mongoose.model("votes", Votes);
