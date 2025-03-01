import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { RxStompService } from '../services/WebSockets/web-socket.service';
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
  private rxStompService = inject(RxStompService);
  private taskService = inject(TaskService);

  ngOnInit() {
    this.taskService.getAll().subscribe((tasks) => (this.tasks = tasks));
    this.topicSubscription = this.rxStompService
      .watch('/topic/tasks')
      .subscribe((message: IMessage) => {
        console.log(message);
        this.tasks = JSON.parse(message.body);
      });
  }

  onSendMessage() {
    const task: Task = {
      title: 'title test',
      description: 'description tests',
    };
    this.rxStompService.publish({
      destination: '/app/tasks.create',
      body: JSON.stringify(task),
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
