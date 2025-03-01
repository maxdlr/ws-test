import { Component, inject, Input } from '@angular/core';
import { Task } from '../../../../model/task.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  styleUrl: './task-list.component.scss',
  imports: [NgForOf, NgIf, DatePipe],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  private taskService = inject(TaskService);

  public delete(task: Task) {
    this.taskService.ws.delete(task);
  }
}
