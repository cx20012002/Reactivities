import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Activity} from "../../../../models/activity";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  @Input() activity: Activity;
  @Input() closeForm: () => void;
  @ViewChild('activityForm') activityForm: NgForm;
  @Input() createOrEdit: (activity: Activity) => void;
  @Input() submitting: boolean;

  constructor() {

  }

  ngOnInit(): void {
    this.setActivity();
  }

  setActivity() {
    this.activity = this.activity ?? {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: ''
    }
  }

  handleSubmit() {
    let activityToReturn = {...this.activityForm.value, id: this.activity.id};
    this.createOrEdit(activityToReturn);
  }

}
