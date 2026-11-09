import db from "../database";

export function createTables() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS proveedores (
    prov_id INTEGER PRIMARY KEY,
    prov_nom TEXT NOT NULL,
    prov_ape TEXT,
    prov_cedula TEXT,
    prov_finca TEXT,
    prov_vereda TEXT,
    prov_tel TEXT
    );

CREATE TABLE IF NOT EXISTS acopios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    offline_id TEXT NOT NULL UNIQUE,
    proveedor_id INTEGER NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    litros REAL NOT NULL,
    prueba_alcohol INTEGER NOT NULL,
    estado_sync TEXT NOT NULL,
    fecha_sync TEXT,
    error_sync TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (proveedor_id, fecha),

    FOREIGN KEY (proveedor_id)
        REFERENCES proveedores(prov_id)
);

    CREATE TABLE IF NOT EXISTS configuracion (
      clave TEXT PRIMARY KEY,
      valor TEXT
    );
CREATE TABLE IF NOT EXISTS usuario_sesion (
    usu_id INTEGER PRIMARY KEY,
    usu_nombre TEXT NOT NULL,
    usu_apellido TEXT NOT NULL,
    usu_cedula TEXT,
    usu_username TEXT,
    rol_id INTEGER,
    rol_nombre TEXT,
    token TEXT NOT NULL,
    fecha_login TEXT
);
  `);

  console.log("✅ Base de datos inicializada");
}
