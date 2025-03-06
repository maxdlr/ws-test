import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { Subscription } from 'rxjs';
import { IMessage } from '@stomp/stompjs';
import { TaskModule } from './tasks/task.module';
import { TaskService } from '../services/task.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [TaskModule],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private topicSubscription!: Subscription;
  private taskService = inject(TaskService);
  private faker = faker;

  ngOnInit() {
    this.taskService.http.getAll().subscribe((tasks) => (this.tasks = tasks));

    this.topicSubscription = this.taskService.ws
      .connect()
      .subscribe((message: IMessage) => {
        this.tasks = JSON.parse(message.body);
        this.tasks.reverse();
      });
  }

  create() {
    this.taskService.ws.add({
      title: this.faker.lorem.sentence(),
      description: this.faker.lorem.paragraph(),
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
