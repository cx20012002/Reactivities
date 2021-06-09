import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../../models/activity";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  @Input() activity: Activity;
  @Input() cancelSelectActivity: () => void;
  @Input() openForm: (id: string) => void;

  constructor() {
  }

  ngOnInit(): void {
  }



}
