import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  controller = '/tp-link-plug';
  constructor(private http: HttpClient) {}

  forceDeviceOnWithIp(ip: string): Observable<any> {
    return this.http.post(environment.API_URL + this.controller + '/force-on', {
      ip: ip,
    });
  }

  forceDeviceOffWithIp(ip: string): Observable<any> {
    return this.http.post(
      environment.API_URL + this.controller + '/force-off',
      { ip: ip }
    );
  }

  turnDeviceOnUntilOverproductionLessThan(
    ip: string,
    minEnergy: number
  ): Observable<any> {
    return this.http.post(
      environment.API_URL + this.controller + '/energy-on',
      { ip: ip, minEnergy: minEnergy }
    );
  }

  getInfoOfDeviceWithIp(ip: string): Observable<any> {
    return this.http.post(
      environment.API_URL + this.controller + '/deviceInfo',
      { ip: ip }
    );
  }
}
