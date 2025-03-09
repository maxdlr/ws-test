import { Model } from './model';

export interface Task extends Model {
  title: string;
  description: string;
  teamId: number;
  createdAt?: Date | string;
}
