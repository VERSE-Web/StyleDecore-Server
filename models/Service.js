const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    category: String,
    price: Number,
    rating: Number,
    reviewCount: Number,
    image: String,
    gallery: [String],
    description: String,
    whatsIncluded: [String],
    popular: Boolean,
    newest: Boolean,
    estimatedDuration: String,
    availableDecorators: [String],
  },
  { collection: "Services", strict: false, timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
