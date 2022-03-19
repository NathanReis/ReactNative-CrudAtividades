import { ILesson } from '../models/ILesson';
import { LessonRepository } from '../repositories/LessonRepository';
import { LessonValidator } from '../validators/LessonValidator';

export class LessonService {
  private readonly repository;
  private readonly validator;

  public constructor() {
    this.repository = new LessonRepository();
    this.validator = new LessonValidator(this);
  }

  public async getAll(): Promise<ILesson[]> {
    let lessons = await this.repository.getAll();

    return lessons as ILesson[];
  }

  public async getById(id: number): Promise<ILesson> {
    let lesson = await this.repository.getById(id);

    return lesson as ILesson;
  }

  public async create(lesson: ILesson): Promise<number | string[]> {
    let errors = await this.validator.validateCreate(lesson);

    if (errors.length > 0) {
      return errors;
    }

    let insertedId = await this.repository.create(lesson);

    return insertedId as number;
  }

  public async update(lesson: ILesson): Promise<string[] | void> {
    let errors = await this.validator.validateUpdate(lesson);

    if (errors.length > 0) {
      return errors;
    }

    await this.repository.update(lesson);
  }

  public async delete(code: number): Promise<void> {
    await this.repository.delete(code);
  }
}
