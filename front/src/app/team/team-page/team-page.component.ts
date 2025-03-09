import { Component, inject, OnInit } from '@angular/core';
import { Team } from '../../../model/team.model';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-team-page',
  imports: [],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent implements OnInit {
  public team!: Team;
  private teamService = inject(TeamService);

  public ngOnInit(): void {
    console.log('hello team');
  }
}
