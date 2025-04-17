const mongoose = require("mongoose");

const Proposals = new mongoose.Schema(
  {
    user: { type: String },
    proposalId: { type: Number },
    name: { type: String },
    ipfshash:{ type: String },
    startTime:{type:Number},
    endTime:{type:Number},
    timestamp: { type: Number },
    txHash: { type: String},
    block: { type: Number },
  },
  { timestamps: true, collection: "proposal" }
);
module.exports = mongoose.model("proposal", Proposals);
