import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevicesService } from './devices.service';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit, OnDestroy {
  deviceStatus = -1;

  private componentLifecycle$ = new Subject();
  constructor(private readonly service: DevicesService) {}

  ngOnDestroy(): void {
    this.componentLifecycle$.next(true)
    this.componentLifecycle$.complete()
  }


  ngOnInit(): void {
    this.getDeviceInfo();
    this.deviceStatus = 0;
    setInterval(() => {
      this.getDeviceInfo();
    }, 36000);
  }

  turnOnUntilEnergy() {
    this.service
      .turnDeviceOnUntilOverproductionLessThan('192.168.178.78', 600)
      .pipe(
        takeUntil(this.componentLifecycle$)
      )
      .subscribe({complete:
        () => {
          this.getDeviceInfo();
        }}
      );
  }

  forceOff() {
    this.service
      .forceDeviceOffWithIp('192.168.178.78')
      .pipe(
        takeUntil(this.componentLifecycle$)
      )
      .subscribe({complete:
          () => {
            this.getDeviceInfo();
          }}
      );
  }

  forceOn() {
    this.service
      .forceDeviceOnWithIp('192.168.178.78')
      .pipe(
        takeUntil(this.componentLifecycle$)
      )
      .subscribe({complete:
          () => {
            this.getDeviceInfo();
          }}
      );
  }

  getDeviceInfo() {
    this.service
      .getInfoOfDeviceWithIp('192.168.178.78')
      .pipe(
        takeUntil(this.componentLifecycle$)
      )
      .subscribe({complete:
          () => {
            this.getDeviceInfo();
          }}
      );
  }
}
