import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  controller = "/fronius-photovoltaik"

  constructor(private readonly http: HttpClient) { }

  getEnergyData(): Observable<any>{
    return this.http.get(environment.API_URL + this.controller + "/data")
  }
}
