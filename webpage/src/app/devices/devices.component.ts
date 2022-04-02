import { Component, OnInit } from '@angular/core';
import {DevicesService} from "./devices.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(readonly service: DevicesService) { }

  ngOnInit(): void {
  }

  turnOnUntilEnergy() {
    //console.log("subscribing")
    const subscription = this.service.turnDeviceOnUntilOverproductionLessThan('192.168.178.78', 1000)
      .subscribe(data => {
          //console.log(data)
        }, error => {
          //this.serverHealth = -1
          //console.log(error)
        }, () => {
          subscription.unsubscribe()
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
        }
      );
  }
}
