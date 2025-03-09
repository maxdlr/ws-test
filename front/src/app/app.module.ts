import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { CommonModule } from '@angular/common';
import { TaskModule } from './tasks/task.module';
import { RouterOutlet } from '@angular/router';
import { TeamModule } from './team/team.module';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, TaskModule, RouterOutlet, TeamModule],
  providers: appConfig.providers,
})
export class AppModule {}

await bootstrapApplication(AppComponent);
