import { StatusEnum } from '../enums/StatusEnum';
import { ILesson } from '../models/ILesson';
import { LessonService } from '../services/LessonService';

export class LessonValidator {
  private readonly service: LessonService;

  public constructor(lessonService: LessonService) {
    this.service = lessonService;
  }

  public async validateCreate(lesson: ILesson): Promise<string[]> {
    let errors: string[] = [];

    this.getDescriptionErrors(lesson.description).forEach(error => errors.push(error));

    return errors;
  }

  public async validateUpdate(lesson: ILesson): Promise<string[]> {
    let errors: string[] = [];

    this.getIdErrors(Number(lesson.id)).forEach(error => errors.push(error));
    this.getDescriptionErrors(lesson.description).forEach(error => errors.push(error));

    return errors;
  }

  public async validateUpdateStatus(id: number, status: StatusEnum): Promise<string[]> {
    let errors: string[] = [];

    this.getIdErrors(id).forEach(error => errors.push(error));

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
