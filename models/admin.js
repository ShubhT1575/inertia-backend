const mongoose = require("mongoose");

const admin = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "admin" }
);

module.exports = mongoose.model("admin", admin);
