import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activity} from "./models/activity";
import {v4 as uuid} from 'uuid';
import {AgentService} from "./api/agent.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activities: Activity[];
  selectedActivity: Activity | null;
  editMode: boolean = false;
  loading: boolean = true;
  submitting: boolean = false;

  constructor(
    private http: HttpClient,
    private agentService: AgentService,
    private spinnerService: NgxSpinnerService) {

    spinnerService.show(undefined,
      {
        type: 'ball-clip-rotate-pulse',
        fullScreen: true,
        bdColor: 'rgba(200,200,200,1)'
      });
  }

  ngOnInit(): void {
    this.agentService.activities.list().subscribe((response: Activity[]) => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      this.activities = activities;
    }, error => {
      console.log(error);
    }, () => {
      this.loading = false;
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
    this.submitting = true;

    if (activity.id) {
      this.agentService.activities.update(activity).subscribe(() => {
        this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      })
    } else {
      activity.id = uuid();
      this.agentService.activities.create(activity).subscribe(() => {
        this.activities = [...this.activities, {...activity, id: uuid()}];
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      })
    }
  }

  handleDeleteActivity = (id: string) => {
    this.submitting = true;
    this.agentService.activities.delete(id).subscribe(() => {
      this.activities = [...this.activities.filter(x => x.id !== id)];
      this.submitting = false;
    })
  }
}
