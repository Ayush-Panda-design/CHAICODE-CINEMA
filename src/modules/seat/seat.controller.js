import { getAllSeats } from "./seat.service.js";

export const getSeats = async (req, res, next) => {
  try {
    const seats = await getAllSeats();
    res.json(seats);
  } catch (err) {
    next(err);
  }
};