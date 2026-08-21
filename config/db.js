const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Comprobar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectar con PostgreSQL:", err.stack);
  } else {
    console.log("✅ Conexión exitosa a la base de datos de Chitalac");
  }
  if (client) release();
});

module.exports = pool;
