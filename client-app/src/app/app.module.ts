import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {ActivityDashboardComponent} from './features/activities/dashboard/activity-dashboard/activity-dashboard.component';
import {ActivityListComponent} from './features/activities/dashboard/activity-list/activity-list.component';
import {ActivityDetailsComponent} from './features/activities/details/activity-details/activity-details.component';
import {ActivityFormComponent} from './features/activities/form/activity-form/activity-form.component';
import {FormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActivityDashboardComponent,
    ActivityListComponent,
    ActivityDetailsComponent,
    ActivityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
