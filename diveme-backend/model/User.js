const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    userType: {
      type: String,
      enum: ["tourist", "admin"],
      default: "tourist",
    },

    // Optional fields for 'admin' userType
    businessName: {
      type: String,
      required: function () {
        return this.userType === "admin";
      },
    },
    businessAddress: {
      type: String,
      required: function () {
        return this.userType === "admin";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
