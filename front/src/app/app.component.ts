import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { Subscription } from 'rxjs';
import { IMessage } from '@stomp/stompjs';
import { TaskModule } from './tasks/task.module';
import { TaskService } from '../services/task.service';

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

  ngOnInit() {
    this.taskService.http.getAll().subscribe((tasks) => (this.tasks = tasks));

    this.topicSubscription = this.taskService.ws
      .connect()
      .subscribe((message: IMessage) => {
        this.tasks = JSON.parse(message.body);
      });
  }

  create() {
    this.taskService.ws.create({
      title: 'title test',
      description: 'description tests',
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
