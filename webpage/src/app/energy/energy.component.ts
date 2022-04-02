import { Component, OnInit } from '@angular/core';
import {EnergyService} from "./energy.service";

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css']
})
export class EnergyComponent implements OnInit {

  verbrauch: number = 0
  generierung: number = 0

  constructor(private readonly service: EnergyService) {
    this.showEnergyData()
  }

  ngOnInit(): void {
    var intervalId = setInterval(() => {
      this.showEnergyData()
    }, 10000);
  }

  showEnergyData(){
    const subscription = this.service.getEnergyData()
      .subscribe(data => {
          this.generierung = data.generierung
          this.verbrauch = Math.abs(data.verbrauch)
        }, error => {
          //console.log(error)
        }, () => {
          subscription.unsubscribe()
        }
      );
  }

}
