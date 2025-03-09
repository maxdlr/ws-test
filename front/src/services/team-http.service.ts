import { inject, Injectable } from '@angular/core';
import { WsModelService } from './WebSockets/WsModelService';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { Utils } from '../utils/Utils';
import { Team } from '../model/team.model';

@WsModelService('teams')
@Injectable({
  providedIn: 'root',
})
export class TeamHttpService {
  private httpClient = inject(HttpClient);
  private path = environment.apiUrl + 'teams';

  public getAll(): Observable<Team[]> {
    return this.httpClient
      .get<Team[]>(`${this.path}`)
      .pipe(
        map(
          (teams: Team[]) =>
            Utils.distributeModelTransformLogic(teams, (team: Team) =>
              this.applyTransformRules(team)
            ) as Team[]
        )
      );
  }

  private applyTransformRules(team: Team): Team {
    team.createdAt = new Date(team.createdAt as string);
    return team;
  }
}
