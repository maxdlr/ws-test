import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../../model/task.model';
import { IMessage } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { TaskHttpService } from '../../../../services/task-http.service';
import { faker } from '@faker-js/faker';
import { WsService } from '../../../../services/WebSockets/WsModelAbstractService';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: false,
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private topicSubscription!: Subscription;
  private taskService = inject(TaskHttpService);
  private wsService = inject(WsService<Task>);
  private faker = faker;

  ngOnInit() {
    this.taskService.http.getAll().subscribe((tasks) => (this.tasks = tasks));

    this.topicSubscription = this.wsService.ws
      .connect()
      .subscribe((message: IMessage) => {
        this.tasks = JSON.parse(message.body);
        this.tasks.reverse();
      });
  }

  create() {
    this.wsService.ws.add({
      title: this.faker.lorem.sentence(),
      description: this.faker.lorem.paragraph(),
      teamId: 2,
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
