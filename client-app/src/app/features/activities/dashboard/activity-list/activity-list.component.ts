import {Component, ElementRef, Input, OnInit} from '@angular/core';
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
  @Input() submitting: boolean;

  target: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleActivityDelete(e: MouseEvent, id: string){
    // @ts-ignore
    this.target = e.target.name;
    this.deleteActivity(id);
  }

}
