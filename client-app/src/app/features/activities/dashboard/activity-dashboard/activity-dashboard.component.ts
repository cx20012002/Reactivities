import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../../models/activity";

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css']
})
export class ActivityDashboardComponent implements OnInit {
  @Input() activities: Activity[];
  @Input() selectedActivity: Activity | null;
  @Input() selectActivity: (id: string) => void;
  @Input() cancelSelectActivity: () => void;
  @Input() editMode: boolean;
  @Input() openForm: (id: string) => void;
  @Input() closeForm: () => void;
  @Input() createOrEdit: (activity: Activity) => void;
  @Input() deleteActivity: (id: string) => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}
