
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// Pool is nothing but group of connections.
// If you pick one connection out of the pool and release it,
// the pooler will keep that connection open for sometime for other clients to reuse.
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  
  ssl: {
    rejectUnauthorized: false,
  },

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});
export default pool;
