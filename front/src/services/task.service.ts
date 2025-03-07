import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { Utils } from '../utils/Utils';
import { RxStompService } from './WebSockets/web-socket.service';
import { IMessage } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private rxStompService = inject(RxStompService);
  public ws = {
    connect: (): Observable<IMessage> => {
      return this.rxStompService.watch('/topic/tasks');
    },
    add: (task: Task): void => {
      this.rxStompService.publish({
        destination: '/app/tasks.add',
        body: JSON.stringify(task),
      });
    },
    delete: (task: Task): void => {
      if (!task.id) return;
      this.rxStompService.publish({
        destination: '/app/tasks.delete',
        body: task.id.toString(),
      });
    },
    save: (task: Task): void => {
      this.rxStompService.publish({
        destination: '/app/tasks.save',
        body: JSON.stringify(task),
      });
    },
  };
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
