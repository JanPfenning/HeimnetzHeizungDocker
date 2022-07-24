import { Injectable } from '@nestjs/common';
import { cloudLogin, getDeviceInfo, listDevicesByType, loginDeviceByIp, turnOff, turnOn } from "tp-link-tapo-connect";
import { FroniusPhotovoltaikService } from "../fronius-photovoltaik/fronius-photovoltaik.service";

@Injectable()
export class TpLinkPlugService {

  devices: Set<string> = new Set<string>()


  constructor(private readonly energyService: FroniusPhotovoltaikService) {
  }

  async healthCheck() {
    try {
      await this.getGeneralInfo()
      return true
    } catch (e) {
      return false
    }
  }

  async getGeneralInfo() {
    const cloudToken = await cloudLogin(
      process.env['TP_LINK_EMAIL'],
      process.env['TP_LINK_PASS'],
    );
    return await listDevicesByType(cloudToken, 'SMART.TAPOPLUG')
  }

  async getDeviceInfo(ip: string) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const deviceToken = await loginDeviceByIp(
          process.env['TP_LINK_EMAIL'] ?? '',
          process.env['TP_LINK_PASS'] ?? '',
          ip
        );
        return await getDeviceInfo(deviceToken);
      } catch (e) {
        //console.log(e)
      }
    }
  }

  async turnPlugOn(ip: string): Promise<boolean> {
    let err = true
    while (err) {
      try {
        const deviceToken = await loginDeviceByIp(
          process.env['TP_LINK_EMAIL'] ?? '',
          process.env['TP_LINK_PASS'] ?? '',
          ip
        );
        this.devices.add(ip)
        await turnOn(deviceToken);
        err = false
      } catch (e) {
        //console.log(err)
      }
    }
    return true
  }

  async turnPlugOff(ip: string): Promise<boolean> {
    let err = true;
    while (err) {
      try {
        const deviceToken = await loginDeviceByIp(
          process.env['TP_LINK_EMAIL'] ?? '',
          process.env['TP_LINK_PASS'] ?? '',
          ip
        );
        await turnOff(deviceToken);
        err = false;
      } catch (e) {
        //console.log(e)
      }
    }
    return true
  }

  async turnOnWithEnergyConstraint(ip: string, energy: number) {
    const curGeneration = await this.energyService.uebergenerierung() ?? -1
    if (curGeneration > energy) {
      await this.turnPlugOn(ip)
      console.log(`Time of turning on: ${Date.now()}`)
      const energyTooLow: Promise<number> = this.energyService.observeEnergyConsumption(0)//this.energyService.observeEnergyConsumption(body.minEnergy)
      // eslint-disable-next-line no-async-promise-executor
      const deviceTurnedOff: Promise<number> = new Promise<number>(async (resolve, reject) => {
        while ((await this.getDeviceInfo(ip)).device_on) {
          const _wtf = 0;
          // TODO: please clean this up !!!
        }
        resolve(Date.now());
      })
      Promise.race([energyTooLow, deviceTurnedOff]).then(
        async (timestamp) => {
          await this.turnPlugOff(ip)
          console.log(`Time of turning off: ${timestamp}`)
        })
      return true
    }
    console.log(`Not enough energy overflow (${curGeneration}) to start the devic (with cost: ${energy}). You may force the device to start anyway`)
    return false
  }

  async timerResolveAfter(millis: number): Promise<number> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // eslint-disable-next-line no-async-promise-executor
      await new Promise(async (resolveWait, reject) => {
        setTimeout(() => {
          resolveWait(true)
        }, millis);
      })
      resolve(Date.now());
    })
  }
}
