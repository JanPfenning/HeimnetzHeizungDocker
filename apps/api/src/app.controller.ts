import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {FroniusPhotovoltaikService} from "./fronius-photovoltaik/fronius-photovoltaik.service";
import {TpLinkPlugService} from "./tp-link-plug/tp-link-plug.service";
import {TemperatureService} from "./temperature/temperature.service";
import {MosquittoService} from "./mosquitto/mosquitto.service";
import {DatabaseService} from "./database/database.service";

// Wechselrichter - https://github.com/akleber/fronius-json-tools/blob/master/examples/json/1.2.3-1/GetPowerFlowRealtimeData.json
// TP link stecker - https://npm.io/package/tp-link-tapo-connect
@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
              private readonly wechselrichterService: FroniusPhotovoltaikService,
              private readonly tpLinkService: TpLinkPlugService,
              private readonly temperatureService: TemperatureService,
              private readonly mosquittoService: MosquittoService,
              private readonly databaseService: DatabaseService,
  ) {}

  @Get('/ping')
  ping(): string {
    return 'pong'
  }

  @Get("/health")
  async getApiStatus(): Promise<boolean> {
    return true
  }

  @Get("/health/database")
  async getDatabaseStatus(): Promise<boolean> {
    return this.databaseService.healthCheckDatabase()
  }

  @Get("/health/sensor")
  async getSensorStatus(): Promise<boolean> {
    return this.temperatureService.healthCheckSensor()
  }

  @Get("/health/broker")
  async getBrokerStatus(): Promise<boolean> {
    return this.mosquittoService.healthCheckBroker()
  }

  @Get("/health/wechselrichter")
  async getWechselrichterStatus(): Promise<boolean> {
    return this.wechselrichterService.healthCheck()
  }

  @Get("/health/tplink")
  async getTpLinkCloudStatus(): Promise<boolean> {
    return this.tpLinkService.healthCheck()
  }
}
