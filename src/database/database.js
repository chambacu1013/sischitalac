import * as SQLite from "expo-sqlite";

// Nombre de la base de datos local
const DATABASE_NAME = "sischitalac.db";

// Abrir o crear la base de datos
const db = SQLite.openDatabaseSync(DATABASE_NAME);

export default db;
