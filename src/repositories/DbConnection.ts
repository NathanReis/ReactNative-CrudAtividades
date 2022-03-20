import * as SQLite from 'expo-sqlite';

const DB_CONNECTION = SQLite.openDatabase('db.sqlite');

DB_CONNECTION.exec(
  [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
  false,
  () => console.log('FOREIGN KEY was enable')
)

export default DB_CONNECTION;
