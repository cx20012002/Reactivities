import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Activity} from "../models/activity";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {

  }

  activities = {
    list: () => {
      return this.http.get<Activity[]>(this.baseUrl + '/activities').pipe(delay(1000));
    },
    details: (id: string) => this.http.get<Activity>(this.baseUrl + `/activities/${id}`).pipe(delay(1000)),
    create: (activity: Activity) => this.http.post<void>(this.baseUrl + '/activities', activity).pipe(delay(1000)),
    update: (activity: Activity) => this.http.put<void>(this.baseUrl + `/activities/${activity.id}`, activity).pipe(delay(1000)),
    delete: (id: string) => this.http.delete<void>(this.baseUrl + `/activities/${id}`).pipe(delay(1000))
  }


}
