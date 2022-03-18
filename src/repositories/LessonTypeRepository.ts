import { ILessonType } from '../models/ILessonType';

export class LessonTypeRepository {
  public async getAll(): Promise<ILessonType[]> {
    let lessonTypes = [] as ILessonType[];

    return lessonTypes;
  }

  public async getById(id: number): Promise<ILessonType | null> {
    let lessonType = {} as ILessonType;

    return lessonType || null;
  }

  public async create(lessonType: ILessonType): Promise<void> { }

  public async update(lessonType: ILessonType): Promise<void> { }

  public async delete(id: number): Promise<void> { }
}
