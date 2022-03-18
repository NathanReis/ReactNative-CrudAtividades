import { ILessonType } from '../models/ILessonType';
import { LessonTypeRepository } from '../repositories/LessonTypeRepository';
import { LessonTypeValidator } from '../validators/LessonTypeValidator';

export class LessonTypeService {
  private readonly repository;
  private readonly validator;

  public constructor() {
    this.repository = new LessonTypeRepository();
    this.validator = new LessonTypeValidator(this);
  }

  public async getAll(): Promise<ILessonType[]> {
    let lessonTypes = await this.repository.getAll();

    return lessonTypes;
  }

  public async getById(id: number): Promise<ILessonType | null> {
    let lessonType = await this.repository.getById(id);

    return lessonType;
  }

  public async create(lessonType: ILessonType): Promise<string[] | void> {
    let errors = await this.validator.validateCreate(lessonType);

    if (errors.length > 0) {
      return errors;
    }

    await this.repository.create(lessonType);
  }

  public async update(lessonType: ILessonType): Promise<string[] | void> {
    let errors = await this.validator.validateUpdate(lessonType);

    if (errors.length > 0) {
      return errors;
    }

    await this.repository.update(lessonType);
  }

  public async delete(code: number): Promise<void> {
    await this.repository.delete(code);
  }
}
