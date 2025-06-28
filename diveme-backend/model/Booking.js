const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: String,
  packageName: String,
  packagePrice: Number,
  centerName: String,
  selectedDate: String,
  participants: Number,
  personalDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    medicalConditions: String,
    experience: String,
  },
  specialRequests: String,
  totalAmount: Number,
  reference: String,
  submittedAt: Date,
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
