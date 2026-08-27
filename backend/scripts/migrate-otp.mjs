import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "brancho",
  password: process.env.DB_PASSWORD || "Br@ncho#2026",
  database: process.env.DB_NAME || "brancho",
  charset: "utf8mb4",
});

async function columnExists(column) {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS c FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Users' AND COLUMN_NAME = ?",
    [column]
  );
  return rows[0].c > 0;
}

const DEFS = [
  ["otpCode", "VARCHAR(10) DEFAULT NULL"],
  ["otpExpire", "DATETIME DEFAULT NULL"],
  ["otpAttempts", "INT NOT NULL DEFAULT 0"],
];

async function main() {
  for (const [name, ddl] of DEFS) {
    if (await columnExists(name)) {
      console.log(`column ${name}: already exists (skipping)`);
    } else {
      await pool.query(`ALTER TABLE Users ADD COLUMN ${name} ${ddl}`);
      console.log(`column ${name}: added`);
    }
  }
  await pool.end();
  console.log("Migration complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
