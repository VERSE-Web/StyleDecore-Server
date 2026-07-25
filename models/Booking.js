const mongoose = require("mongoose");

const StatusHistorySchema = new mongoose.Schema(
  {
    status: String,
    timestamp: String,
    note: String,
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema(
  {
    id: String,
    userId: String,
    userName: String,
    userEmail: String,
    serviceId: String,
    serviceName: String,
    serviceCategory: String,
    serviceImage: String,
    amount: Number,
    serviceType: String,
    date: String,
    time: String,
    location: String,
    specialNotes: String,
    status: String,
    decoratorId: String,
    decoratorName: String,
    paymentStatus: String,
    paymentMethod: String,
    createdAt: String,
    statusHistory: [StatusHistorySchema],
  },
  { collection: "Bookings", strict: false, timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
