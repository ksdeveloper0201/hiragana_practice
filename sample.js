import * as SQLite from "expo-sqlite";

export function connectSqlite() {
    const db = SQLite.openDatabaseSync("sample-data.db");
    return db;
}
