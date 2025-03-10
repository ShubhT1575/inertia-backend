const mongoose = require("mongoose");

const ExpireTime = new mongoose.Schema(
  {
    newExpireTime:{type:Number,required:true},
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true, unique: true },
    block: { type: Number, required: true },
  },
  { timestamps: true, collection: "expiretime"}
);
module.exports = mongoose.model("expiretime", ExpireTime);
