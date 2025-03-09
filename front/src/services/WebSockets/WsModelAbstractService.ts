import { Observable } from 'rxjs';
import { IMessage } from '@stomp/stompjs';
import { RxStompService } from './web-socket.service';
import { Model } from '../../model/model';
import { inject } from '@angular/core';

export interface WsModelEndPoints {
  watch: string;
  add: string;
  delete: string;
  save: string;
}

export interface WsMethods<M extends Model> {
  connect: () => Observable<IMessage>;
  add: (model: M) => void;
  delete: (model: M) => void;
  save: (model: M) => void;
}

export enum WsTopicNameEnum {
  TASKS = 'tasks',
}

export class WsService<M extends Model> {
  protected rxStompService = inject(RxStompService);
  protected model!: WsModelEndPoints;

  constructor(topicName: WsTopicNameEnum) {
    this.model = {
      watch: `/topic/${topicName}`,
      add: `/app/${topicName}.add`,
      delete: `/app/${topicName}.delete`,
      save: `/app/${topicName}.save`,
    };
  }

  public get ws(): WsMethods<M> {
    return {
      connect: (): Observable<IMessage> => {
        return this.rxStompService.watch(this.model.watch);
      },
      add: (model: M): void => {
        this.rxStompService.publish({
          destination: this.model.add,
          body: JSON.stringify(model),
        });
      },
      delete: (model: M): void => {
        if (!model.id) return;
        this.rxStompService.publish({
          destination: this.model.delete,
          body: model.id.toString(),
        });
      },
      save: (model: M): void => {
        this.rxStompService.publish({
          destination: this.model.save,
          body: JSON.stringify(model),
        });
      },
    };
  }
}
