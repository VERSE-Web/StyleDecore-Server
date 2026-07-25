const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    id: String,
    serviceId: String,
    userName: String,
    userAvatar: String,
    rating: Number,
    comment: String,
    date: String,
  },
  { collection: "Reviews", strict: false, timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
