import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskModule } from './tasks/task.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
