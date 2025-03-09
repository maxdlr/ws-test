import { Component, inject, OnInit } from '@angular/core';
import { Team } from '../../../model/team.model';
import { TeamHttpService } from '../../../services/team-http.service';

@Component({
  selector: 'app-team-page',
  imports: [],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent implements OnInit {
  public team!: Team;
  private teamService = inject(TeamHttpService);

  public ngOnInit(): void {
    this.teamService.getAll().subscribe((teams) => {
      console.log(teams);
    });
  }
}
