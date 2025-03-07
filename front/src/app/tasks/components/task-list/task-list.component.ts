import { Component, Input } from '@angular/core';
import { Task } from '../../../../model/task.model';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskReadComponent } from '../task-read/task-read.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  styleUrl: './task-list.component.scss',
  imports: [NgForOf, NgIf, FormsModule, TaskReadComponent],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
}
