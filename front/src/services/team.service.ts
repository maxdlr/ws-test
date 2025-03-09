import { Injectable } from '@angular/core';
import { WsModelService } from './WebSockets/WsModelService';

@WsModelService('teams')
@Injectable({
  providedIn: 'root',
})
export class TeamService {}
