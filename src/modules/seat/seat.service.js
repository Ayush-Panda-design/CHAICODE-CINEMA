import pool from "../../common/config/db.js";

export const getAllSeats = async () => {
  const result = await pool.query("SELECT * FROM seats");
  return result.rows;
};