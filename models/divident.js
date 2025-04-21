const mongoose = require("mongoose");

const Dividents = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },              // For querying dividend history by user
    amount: { type: Number, required: true },
    timestamp: { type: Number, required: true, index: true },         // For sorting/filtering by time
    txHash: { type: String, required: true, unique: true, index: true }, // Ensures uniqueness of each dividend tx
    block: { type: Number, required: true, index: true },             // For blockchain-level queries
  },
  { timestamps: true, collection: "divident" }
);

module.exports = mongoose.model("divident", Dividents);
