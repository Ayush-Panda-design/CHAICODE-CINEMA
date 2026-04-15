
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// Pool is nothing but group of connections.
// If you pick one connection out of the pool and release it,
// the pooler will keep that connection open for sometime for other clients to reuse.
const pool =
new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;