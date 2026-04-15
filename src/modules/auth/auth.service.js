import bcrypt from "bcrypt";
import pool from "../../common/config/db.js";
import { signToken } from "../../common/utils/jwt.utils.js";
import { ApiError } from "../../common/utils/api-error.js";

const SALT_ROUNDS = 10;

export const registerUser = async (email, password) => {
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rowCount > 0) throw new ApiError(409, "Email already registered");

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hashed]
  );
  return result.rows[0];
};

export const loginUser = async (email, password) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rowCount === 0) throw new ApiError(401, "Invalid email or password");

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ApiError(401, "Invalid email or password");

  const token = signToken({ id: user.id, email: user.email });
  return { token, user: { id: user.id, email: user.email } };
};