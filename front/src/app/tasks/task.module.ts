import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskReadComponent } from './components/task-read/task-read.component';

@NgModule({
  declarations: [TaskListComponent, TaskReadComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TaskListComponent, TaskReadComponent],
})
export class TaskModule {}
