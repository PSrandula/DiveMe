const Booking = require("../model/Booking");

exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    const reference = `DB${Date.now().toString().slice(-6)}`;
    const submittedAt = new Date();

    const userId = req.user._id;

    const newBooking = new Booking({
      ...bookingData,
      userId,
      reference,
      submittedAt,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking successful", reference });
  } catch (error) {
    console.error("Booking Error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while saving the booking." });
  }
};