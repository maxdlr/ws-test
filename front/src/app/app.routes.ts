import { Routes } from '@angular/router';
import { TeamPageComponent } from './team/team-page/team-page.component';
import { AppComponent } from './app.component';
import { TaskListComponent } from './tasks/components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'tasks',
    component: TaskListComponent,
  },
  {
    path: 'playground',
    component: TeamPageComponent,
  },
];
