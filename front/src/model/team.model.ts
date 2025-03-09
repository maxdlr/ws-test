import { Model } from './model';
import { Task } from './task.model';

export interface Team extends Model {
  name: string;
  tasks: Task[];
  createdAt?: Date | string;
}
