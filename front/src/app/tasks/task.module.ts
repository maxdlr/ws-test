import { NgModule } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskReadComponent } from './components/task-read/task-read.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskListComponent, TaskReadComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [TaskListComponent, TaskReadComponent],
})
export class TaskModule {}
