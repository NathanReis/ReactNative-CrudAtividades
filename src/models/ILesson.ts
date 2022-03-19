import { LocalEnum } from '../enums/LocalEnum';
import { StatusEnum } from '../enums/StatusEnum';
import { ILessonType } from './ILessonType';

export interface ILesson {
  id?: number;
  lessonTypeId: number;
  lessonType?: ILessonType;
  description: string;
  local: LocalEnum | string;
  sendDateTime: Date;
  status: StatusEnum | string;
}
