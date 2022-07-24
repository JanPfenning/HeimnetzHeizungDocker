import { Injectable } from '@nestjs/common';
import fetch from "node-fetch";

@Injectable()
export class FroniusPhotovoltaikService {

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.generalInfo()
      return !!response
    } catch (err) {
      return false
    }
  }

  async uebergenerierung(): Promise<number | null> {
    try {
      const response = await fetch(`http://${process.env['WECHSELRICHTER_IP']}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`);
      const data = await response.json();
      const obj = data.Body.Data.Site;

      return obj.P_Grid > 0 ? 0 : Math.abs(obj.P_Grid);
    } catch (e) {
      return null
    }

  }

  async generalInfo(): Promise<any> {
    try {
      const response = await fetch(`http://${process.env['WECHSELRICHTER_IP']}/solar_api/v1/GetPowerFlowRealtimeData.fcgi`);
      return await response.json()
    } catch (e) {
      return null
    }
  }

  async logGeneralInfo() {
    try {
      const data = await this.generalInfo()
      const obj = data.Body.Data.Site;

      const verbrauch = Math.abs(obj.P_Load);
      const generierung = obj.P_PV;
      const differenz = obj.P_Grid; //Positive means Energy from Outside is drawn
      const calculated_diff = Math.round(obj.P_PV - Math.abs(obj.P_Load));

      console.log(`Verbrauch:\t${verbrauch}`);
      console.log(`Generierung:\t${generierung}`);
      console.log(`${differenz < 0 ? 'Übergenerierung' : 'Überverbrauch'}:\t${differenz}`);
      console.log(`${generierung} - ${Math.abs(verbrauch)} = ${calculated_diff}`)
    } catch (e) {
      console.log('Wechselrichter scheint nicht erreichbar zu sein')
    }
  }

  // TODO: please clean this up !!!
  async observeEnergyConsumption(overproductionThreshold: number): Promise<number> {
    // eslint-disable-next-line no-async-promise-executor
    const x: Promise<number> = new Promise(async (resolve, reject) => {
      while (await this.uebergenerierung() ?? -1 > overproductionThreshold) {
        const _wtf = 0;

      }
      resolve(Date.now());
    })
    return x;
  }

  async data() {
    const generalInfo = await this.generalInfo();
    return {
      generierung: generalInfo.Body.Data.Site.P_PV,
      verbrauch: Math.abs(generalInfo.Body.Data.Site.P_Load),
    }
  }
}
