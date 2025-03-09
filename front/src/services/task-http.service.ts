import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  private httpClient = inject(HttpClient);
  private path = environment.apiUrl + 'tasks';
  public http = {
    getAll: (): Observable<Task[]> => {
      return this.httpClient
        .get<Task[]>(`${this.path}`)
        .pipe(
          map(
            (tasks: Task[]) =>
              Utils.distributeModelTransformLogic(tasks, (task: Task) =>
                this.applyTransformRules(task)
              ) as Task[]
          )
        );
    },
  };

  private applyTransformRules(task: Task): Task {
    task.createdAt = new Date(task.createdAt as string);
    return task;
  }
}
