import { ILesson } from '../models/ILesson';
import DB_CONNECTION from './DbConnection';

export class LessonRepository {
  private readonly tableName;

  public constructor() {
    this.tableName = 'tbLessons';
    this.createTable();
  }

  public async getAll() {
    let lessons = [] as ILesson[];
    let query = `
      SELECT *
      FROM ${this.tableName};`;

    return new Promise((resolve, reject) => {
      DB_CONNECTION.transaction(
        transaction => transaction.executeSql(
          query,
          [],
          (_, result) => {
            let amountRows = result.rows.length;

            for (let i = 0; i < amountRows; i++) {
              let lesson = result.rows.item(i) as ILesson;
              lesson.sendDateTime = new Date(lesson.sendDateTime);

              lessons.push(lesson);
            }

            resolve(lessons);
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
      DB_CONNECTION.transaction(
        transaction => transaction.executeSql(
          query,
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              let lesson = result.rows.item(0) as ILesson;
              lesson.sendDateTime = new Date(lesson.sendDateTime);

              resolve(lesson);
            } else {
              reject(false);
            }
          }
        ),
        error => reject(error)
      );
    });
  }

  public async create(lesson: ILesson) {
    let query = `
      INSERT INTO ${this.tableName} (lessonTypeId, description, local, sendDateTime, status)
      VALUES (?, ?, ?, ?, ?);`;

    return new Promise((resolve, reject) => {
      DB_CONNECTION.transaction(
        transaction => transaction.executeSql(
          query,
          [lesson.lessonTypeId, lesson.description, lesson.local, lesson.sendDateTime.toISOString(), lesson.status],
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

  public async update(lesson: ILesson) {
    let query = `
      UPDATE ${this.tableName}
      SET
        lessonTypeId = ?,
        description = ?,
        local = ?,
        sendDateTime = ?,
        status = ?
      WHERE id = ?;`;

    return new Promise((resolve, reject) => {
      DB_CONNECTION.transaction(
        transaction => transaction.executeSql(
          query,
          [lesson.lessonTypeId, lesson.description, lesson.local, lesson.sendDateTime.toISOString(), lesson.status, lesson.id!],
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
      DB_CONNECTION.transaction(
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
        lessonTypeId INTEGER NOT NULL,
        description TEXT NOT NULL,
        local TEXT NOT NULL,
        sendDateTime TIMESTAMP NOT NULL,
        status TEXT NOT NULL,
        CONSTRAINT fkLessonXLessonTypeId
          FOREIGN KEY (lessonTypeId)
          REFERENCES tbLessonTypes (id)
          ON DELETE CASCADE
      );`;

    return new Promise((resolve, reject) => {
      DB_CONNECTION.transaction(
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
