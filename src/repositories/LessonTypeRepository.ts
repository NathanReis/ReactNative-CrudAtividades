import * as SQLite from 'expo-sqlite';
import { ILessonType } from '../models/ILessonType';

export class LessonTypeRepository {
  private readonly connection;
  private readonly tableName;

  public constructor() {
    this.connection = SQLite.openDatabase('db.db');
    this.tableName = 'tbLessonTypes';
    this.createTable();
  }

  public async getAll() {
    let lessonTypes = [] as ILessonType[];
    let query = `
      SELECT *
      FROM ${this.tableName};`;

    return new Promise((resolve, reject) => {
      this.connection.transaction(
        transaction => transaction.executeSql(
          query,
          [],
          (_, result) => {
            let amountRows = result.rows.length;

            for (let i = 0; i < amountRows; i++) {
              lessonTypes.push(result.rows.item(i));
            }

            resolve(lessonTypes);
          }
        ),
        error => reject(error)
      );
    });
  }

  public async getById(id: number) {
    let query = `
      SELECT *
      FROM ${this.tableName}
      WHERE id = ?;`;

    return new Promise((resolve, reject) => {
      this.connection.transaction(
        transaction => transaction.executeSql(
          query,
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows.item(0) as ILessonType);
            } else {
              reject(false);
            }
          }
        ),
        error => reject(error)
      );
    });
  }

  public async create(lessonType: ILessonType) {
    let query = `
      INSERT INTO ${this.tableName} (description)
      VALUES (?);`;

    return new Promise((resolve, reject) => {
      this.connection.transaction(
        transaction => transaction.executeSql(
          query,
          [lessonType.description],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(result.insertId);
            } else {
              reject(false);
            }
          }
        ),
        error => reject(error)
      );
    });
  }

  public async update(lessonType: ILessonType) {
    let query = `
      UPDATE ${this.tableName}
      SET description = ?
      WHERE id = ?;`;

    return new Promise((resolve, reject) => {
      this.connection.transaction(
        transaction => transaction.executeSql(
          query,
          [lessonType.description, Number(lessonType.id)],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(true);
            } else {
              reject(false);
            }
          }
        ),
        error => reject(error)
      );
    });
  }

  public async delete(id: number) {
    let query = `
      DELETE FROM ${this.tableName}
      WHERE id = ?;`;

    return new Promise((resolve, reject) => {
      this.connection.transaction(
        transaction => transaction.executeSql(
          query,
          [id],
          (_, result) => resolve(true)
        ),
        error => reject(error)
      );
    });
  }

  public async createTable() {
    let query = `
      CREATE TABLE IF NOT EXISTS ${this.tableName}
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL
      );`;

    return new Promise((resolve, reject) => {
      this.connection.transaction(
        transaction => transaction.executeSql(
          query,
          [],
          (_, result) => resolve(true)
        ),
        error => reject(error)
      );
    });
  }
}
