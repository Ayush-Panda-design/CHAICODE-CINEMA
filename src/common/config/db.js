
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// Pool is nothing but group of connections.
// If you pick one connection out of the pool and release it,
// the pooler will keep that connection open for sometime for other clients to reuse.
const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "cinema_db",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

export default pool;