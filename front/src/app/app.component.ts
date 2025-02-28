import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../model/task.model';
import {RxStompService} from "../services/WebSockets/web-socket.service";
import {Subscription} from "rxjs";
import {IMessage} from "@stomp/stompjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  receivedMessages: Task[] = [];
  private topicSubscription!: Subscription;

  constructor(private rxStompService: RxStompService) {
  }

  ngOnInit() {
    this.topicSubscription = this.rxStompService
      .watch('/topic/tasks')
      .subscribe((task: IMessage) => {
        this.receivedMessages.push(JSON.parse(task.body));
      });
  }

  onSendMessage() {
    const task: Task = {title: "title test", description: "description tests"};
    this.rxStompService.publish({destination: '/topic/tasks', body: JSON.stringify(task)});
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
