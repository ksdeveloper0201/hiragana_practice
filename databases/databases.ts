import * as SQLite from "expo-sqlite/legacy";

export function connectSqlite() {
    const db = SQLite.openDatabase("dbName.db");
    return db;
}

export async function readSqlite(db: SQLite.SQLiteDatabase) {
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
            INSERT INTO test (value, intValue) VALUES ('test1', 123);
            INSERT INTO test (value, intValue) VALUES ('test2', 456);
            INSERT INTO test (value, intValue) VALUES ('test3', 789);
            `);
        const res = await tx.executeSqlAsync("SELECT COUNT(*) FROM test", []);
        console.log("Count:", result.rows[0]["COUNT(*)"]);
    }, readOnly);
}
