import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  serverHealth = -1;
  wechselrichterHealth = -1;
  tplinkHealth = -1;
  databaseHealth = -1;
  sensorHealth = -1;
  brokerHealth = -1;

  constructor(private readonly Service: AppService) {
    this.healthCheck();
  }

  healthCheck() {
    this.showApiStatus();
    this.showWechselrichterStatus();
    this.showTpLinkCloudStatus();
    this.showSensorStatus();
    this.showBrokerStatus();
    this.showDatabaseStatus();
  }

  showDatabaseStatus() {
    this.databaseHealth = 0;
    const subscription = this.Service.getDatabaseStatus().subscribe(
      (data) => {
        //console.log(`Database: ${data}`)
        this.databaseHealth = data ? 1 : -1;
      },
      (error) => {
        //this.serverHealth = -1
        //console.log(error)
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  showApiStatus() {
    this.serverHealth = 0;
    const subscription = this.Service.getApiStatus().subscribe(
      (data) => {
        //console.log(data)
        this.serverHealth = 1;
      },
      (error) => {
        this.serverHealth = -1;
        //console.log(error)
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  showWechselrichterStatus() {
    this.wechselrichterHealth = 0;
    const subscription = this.Service.getWechselrichterStatus().subscribe(
      (data) => {
        //console.log(data)
        this.wechselrichterHealth = data ? 1 : -1;
      },
      (error) => {
        //this.serverHealth = -1
        //console.log(error)
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  showTpLinkCloudStatus() {
    this.tplinkHealth = 0;
    const subscription = this.Service.getTpLinkCloudStatus().subscribe(
      (data) => {
        //console.log(data)
        this.tplinkHealth = data ? 1 : -1;
      },
      (error) => {
        //this.serverHealth = -1
        //console.log(error)
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  showSensorStatus() {
    this.sensorHealth = 0;
    const subscription = this.Service.getSensorStatus().subscribe(
      (data) => {
        this.sensorHealth = data ? 1 : -1;
      },
      (error) => {
        //this.serverHealth = -1
        //console.log(error)
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  showBrokerStatus() {
    this.brokerHealth = 0;
    const subscription = this.Service.getBrokerStatus().subscribe(
      (data) => {
        //console.log(data)
        this.brokerHealth = data ? 1 : -1;
      },
      (error) => {
        //this.serverHealth = -1
        //console.log(error)
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }
}
