import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "brancho",
  password: process.env.DB_PASSWORD || "Br@ncho#2026",
  database: process.env.DB_NAME || "brancho",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
  timezone: "+05:30",
  dateStrings: true,
});

export type Row = Record<string, unknown>;

/** Run a query and return all rows. */
export async function query<T = Row>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await pool.query(sql, params as mysql.ExecuteValues[]);
  return rows as T[];
}

/** Run a query and return the first row (or null). */
export async function getRow<T = Row>(sql: string, params: unknown[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

/** Run an INSERT/UPDATE/DELETE and return the result metadata. */
export async function execute(
  sql: string,
  params: unknown[] = []
): Promise<{ affectedRows: number; insertId: number }> {
  const [result] = await pool.execute(sql, params as mysql.ExecuteValues[]);
  return { affectedRows: (result as mysql.ResultSetHeader).affectedRows, insertId: (result as mysql.ResultSetHeader).insertId };
}

/** Run a raw multi-statement script (schema setup). */
export async function runScript(sql: string): Promise<void> {
  const conn = await pool.getConnection();
  try {
    await conn.query(sql);
  } finally {
    conn.release();
  }
}

export default pool;
