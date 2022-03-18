import { LocalEnum } from '../enums/LocalEnum';
import { StatusEnum } from '../enums/StatusEnum';
import { ILessonType } from './ILessonType';

export interface ILesson {
  id?: number;
  lessonType: ILessonType;
  description: string;
  local: LocalEnum;
  sendDateTime: Date;
  status: StatusEnum;
}
