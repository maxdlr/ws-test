import { Component, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../../../../model/task.model';
import { TaskService } from '../../../../services/task.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-task-read',
  standalone: false,
  templateUrl: './task-read.component.html',
  styleUrl: './task-read.component.scss',
})
export class TaskReadComponent implements OnInit {
  @Input() task!: Task;
  protected form!: FormGroup;
  protected currentField: string | null = null;
  private taskSubject = new Subject<void>();
  private debounceTime = 500;
  private taskService = inject(TaskService);
  private renderer = inject(Renderer2);

  public delete() {
    this.taskService.ws.delete(this.task);
  }

  public save(field: string) {
    this.task = {
      ...this.task,
      ...(this.form.value as Task),
    };
    this.taskSubject.next();
    this.currentField = field;
  }

  public ngOnInit() {
    this.initForm();
    this.taskSubject.pipe(debounceTime(this.debounceTime)).subscribe(() => {
      this.taskService.ws.save(this.task);
      this.renderer.selectRootElement('#' + this.currentField).focus();
      this.currentField = null;
    });
  }

  public initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.task.title),
      description: new FormControl(this.task.description),
    });
  }
}
