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

  constructor(private readonly service: EnergyService) { }

  ngOnInit(): void {
    this.showEnergyData()
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
