import { ILessonType } from '../models/ILessonType';
import { LessonTypeService } from '../services/LessonTypeService';

export class LessonTypeValidator {
  private readonly service: LessonTypeService;

  public constructor(lessonTypeService: LessonTypeService) {
    this.service = lessonTypeService;
  }

  public async validateCreate(lessonType: ILessonType): Promise<string[]> {
    let errors: string[] = [];

    this.getDescriptionErrors(lessonType.description).forEach(error => errors.push(error));

    return errors;
  }

  public async validateUpdate(lessonType: ILessonType): Promise<string[]> {
    let errors: string[] = [];

    this.getIdErrors(Number(lessonType.id)).forEach(error => errors.push(error));
    this.getDescriptionErrors(lessonType.description).forEach(error => errors.push(error));

    return errors;
  }

  private getIdErrors(id: number): string[] {
    let errors: string[] = [];

    if (id <= 0) {
      errors.push('ID deve ser maior que 0.');
    }

    return errors;
  }

  private getDescriptionErrors(description: string): string[] {
    let errors: string[] = [];

    if (description.length === 0) {
      errors.push('Descrição é obrigatória.');
    }

    return errors;
  }
}
