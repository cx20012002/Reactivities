import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activity} from "./models/activity";
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activities: Activity[];
  selectedActivity: Activity | null;
  editMode: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Activity[]>('http://localhost:5000/api/activities').subscribe((activities: Activity[]) => {
      this.activities = activities;
    })
  }

  handleSelectedActivity = (id: string) => {
    this.selectedActivity = this.activities.find(x => x.id === id);
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = null;
  }

  handleFormOpen = (id?: string) => {
    id ? this.handleSelectedActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  }

  handleFormClose = () => {
    this.editMode = false;
  }

  handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? this.activities = [...this.activities.filter(x => x.id !== activity.id), activity]
      : this.activities = [...this.activities, {...activity, id: uuid()}];
    this.editMode = false;
    this.selectedActivity = activity;
  }

  handleDeleteActivity = (id: string) => {
    this.activities = [...this.activities.filter(x => x.id !== id)];
  }
}
