const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password, userType, businessName, businessAddress } =
    req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashed,
      userType,
    };
    if (userType === "admin") {
      userData.businessName = businessName;
      userData.businessAddress = businessAddress;
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      businessName: user.businessName,
      businessAddress: user.businessAddress,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
