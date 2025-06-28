const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  name: String,
  price: String,
  duration: String,
  description: String,
});

const DiveCenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: String,
    totalReviews: String,
    description: { type: String, required: true },
    features: [String],
    specialties: [String],
    packages: [PackageSchema],
    mainImage: String,
    gallery: [String],
    reviews: { type: [Object], default: [] },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiveCenter", DiveCenterSchema);
