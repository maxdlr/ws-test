import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpClient = inject(HttpClient);
  private path = environment.apiUrl + 'tasks';

  public getAll(): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(`${this.path}`)
      .pipe(map((tasks: Task[]) => this.transform(tasks) as Task[]));
  }

  private transform(tasks: Task[] | Task): Task[] | Task {
    if (Array.isArray(tasks)) {
      return tasks.map((task: Task) => this.applyTransformRules(task));
    }
    return this.applyTransformRules(tasks);
  }

  private applyTransformRules(task: Task): Task {
    task.createdAt = new Date(task.createdAt as string);
    return task;
  }
}
