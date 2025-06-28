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
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ submittedAt: -1 }); // newest first
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ["Pending", "Confirmed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res
      .status(200)
      .json({ message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while updating status." });
  }
};

exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ userId }).sort({ submittedAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Failed to fetch user bookings." });
  }
};