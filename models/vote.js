const mongoose = require("mongoose");

const Votes = new mongoose.Schema(
  {
    user: { type: String, required: true },
    proposalId: { type: Number, required: true },
    voteAmount:{type:Number,required:true},
    isYes:{type:Boolean,required:true},
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true, unique: true },
    block: { type: Number, required: true },
  },
  { timestamps: true, collection: "votes" }
);
module.exports = mongoose.model("votes", Votes);
