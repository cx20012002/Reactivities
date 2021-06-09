import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../../models/activity";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @Input() activities: Activity[];
  @Input() selectActivity: (id: string) => void;
  @Input() deleteActivity: (id: string) => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}
