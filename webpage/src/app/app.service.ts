import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private readonly http: HttpClient) {}

  getApiStatus(): Observable<any> {
    return this.http.get(environment.API_URL+'/health')
  }
  getDatabaseStatus(): Observable<any> {
    return this.http.get(environment.API_URL+'/health/database')
  }
  getSensorStatus(): Observable<any> {
    return this.http.get(environment.API_URL+'/health/sensor')
  }
  getBrokerStatus(): Observable<any> {
    return this.http.get(environment.API_URL+'/health/broker')
  }
  getWechselrichterStatus(): Observable<any> {
    return this.http.get(environment.API_URL+'/health/wechselrichter')
  }
  getTpLinkCloudStatus(): Observable<any> {
    return this.http.get(environment.API_URL+'/health/tplink')
  }

}
