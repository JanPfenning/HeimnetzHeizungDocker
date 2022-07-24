import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  serverHealth = -1;
  wechselrichterHealth = -1;
  tplinkHealth = -1;
  databaseHealth = -1;
  sensorHealth = -1;
  brokerHealth = -1;

  private readonly lifecycle$ = new Subject()

  constructor(private readonly appService: AppService) {
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
    this.appService.getDatabaseStatus()
      .pipe(takeUntil(this.lifecycle$))
      .subscribe(
        (data) => {
          //console.log(`Database: ${data}`)
          this.databaseHealth = data ? 1 : -1;
        });
  }

  showApiStatus() {
    this.serverHealth = 0;
    this.appService.getApiStatus()
      .pipe(takeUntil(this.lifecycle$))
      .subscribe({
        next: (data) => this.serverHealth = 1,
        error: (error) => this.serverHealth = -1
      })
  }

  showWechselrichterStatus() {
    this.wechselrichterHealth = 0;
    this.appService.getWechselrichterStatus()
      .pipe(takeUntil(this.lifecycle$))
      .subscribe((data) => this.wechselrichterHealth = data ? 1 : -1);
  }

  showTpLinkCloudStatus() {
    this.tplinkHealth = 0;
    this.appService.getTpLinkCloudStatus()
      .pipe(takeUntil(this.lifecycle$))
      .subscribe((data) => this.tplinkHealth = data ? 1 : -1);
  }

  showSensorStatus() {
    this.sensorHealth = 0;
    this.appService.getSensorStatus()
      .pipe(takeUntil(this.lifecycle$))
      .subscribe((data) => this.sensorHealth = data ? 1 : -1);
  }

  showBrokerStatus() {
    this.brokerHealth = 0;
    this.appService.getBrokerStatus()
      .pipe(takeUntil(this.lifecycle$))
      .subscribe((data) => this.brokerHealth = data ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.lifecycle$.next(true);
    this.lifecycle$.complete()
  }

  ngOnInit(): void {
    this.healthCheck();
  }
}
