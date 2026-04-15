import { bookSeat } from "./booking.service.js";

export const book = async (req, res) => {
  try {
    const seatId = req.params.id;
    const userId = req.user.id;

    const result = await bookSeat(seatId, userId);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};