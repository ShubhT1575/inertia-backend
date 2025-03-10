const mongoose = require("mongoose");

const Proposals = new mongoose.Schema(
  {
    user: { type: String, required: true },
    proposalId: { type: String, required: true },
    name: { type: String, required: true },
    ipfshash:{ type: String, required: true },
    startTime:{type:Number,required:true},
    endTime:{type:Number,required:true},
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true, unique: true },
    block: { type: Number, required: true },
  },
  { timestamps: true, collection: "proposal" }
);
module.exports = mongoose.model("proposal", Proposals);
