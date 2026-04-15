import pool from "../../common/config/db.js";

export const bookSeat = async (seatId, userId) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const result = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [seatId]
    );

    if (result.rowCount === 0) {
      throw new Error("Seat already booked");
    }

    await conn.query(
      "UPDATE seats SET isbooked = 1 WHERE id = $1",
      [seatId]
    );

    await conn.query(
      "INSERT INTO bookings (user_id, seat_id) VALUES ($1, $2)",
      [userId, seatId]
    );

    await conn.query("COMMIT");

    return { message: "Seat booked successfully" };
  } catch (err) {
    await conn.query("ROLLBACK");
    throw err;
  } finally {
    conn.release();
  }
};