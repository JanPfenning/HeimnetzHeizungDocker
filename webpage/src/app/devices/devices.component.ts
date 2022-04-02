import { Component, OnInit } from '@angular/core';
import {DevicesService} from "./devices.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  deviceStatus = -1;

  constructor(readonly service: DevicesService) {}

  ngOnInit(): void {
    this.deviceStatus = 0;
    var intervalId = setInterval(() => {
      this.getDeviceInfo()
    }, 36000);
  }

  turnOnUntilEnergy() {
    //console.log("subscribing")
    const subscription = this.service.turnDeviceOnUntilOverproductionLessThan('192.168.178.78', 600)
      .subscribe(data => {
          //console.log(data)
        }, error => {
          //this.serverHealth = -1
          //console.log(error)
        }, () => {
          subscription.unsubscribe()
          this.getDeviceInfo()
        }
      );
  }

  forceOff() {
    const subscription = this.service.forceDeviceOffWithIp('192.168.178.78')
      .subscribe(data => {
          //console.log(data)
        }, error => {
          //this.serverHealth = -1
          //console.log(error)
        }, () => {
          subscription.unsubscribe()
          this.getDeviceInfo()
        }
      );
  }

  forceOn() {
    const subscription = this.service.forceDeviceOnWithIp('192.168.178.78')
      .subscribe(data => {
          //console.log(data)
        }, error => {
          //this.serverHealth = -1
          //console.log(error)
        }, () => {
          subscription.unsubscribe()
          this.getDeviceInfo()
        }
      );
  }

  getDeviceInfo(){
    const subscription = this.service.getInfoOfDeviceWithIp('192.168.178.78')
      .subscribe(data => {
          console.log(data);
            this.deviceStatus = data.device_on ? 1 : -1;
      }, error => {

      }, () => {
        subscription.unsubscribe()
      }
    )
  }
}
