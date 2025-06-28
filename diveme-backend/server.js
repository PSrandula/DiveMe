const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const diveCenterRoutes = require("./routes/diveCenterRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/dive-centers", diveCenterRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
