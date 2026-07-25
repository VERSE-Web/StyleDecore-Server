const mongoose = require("mongoose");

const DecoratorSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    role: String,
    avatar: String,
    rating: Number,
    completedProjects: Number,
    specialties: [String],
    bio: String,
    available: Boolean,
    earningsThisMonth: Number,
  },
  { collection: "Decorators", strict: false, timestamps: true }
);

module.exports = mongoose.model("Decorator", DecoratorSchema);
