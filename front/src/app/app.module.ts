import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {appConfig} from "./app.config";
import {CommonModule} from "@angular/common";
import {TaskModule} from "./tasks/task.module";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    TaskModule
  ],
  providers: appConfig.providers,
  bootstrap: [AppComponent],
})
export class AppModule {
}
