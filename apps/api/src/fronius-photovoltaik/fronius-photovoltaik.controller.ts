import {Controller, Get} from '@nestjs/common';
import {FroniusPhotovoltaikService} from "./fronius-photovoltaik.service";

@Controller('fronius-photovoltaik')
export class FroniusPhotovoltaikController {

    constructor(private readonly froniusService: FroniusPhotovoltaikService) {
        this.froniusService.logGeneralInfo()
    }

    @Get('/ping')
    ping(): string{
        return "pong"
    }

    @Get()
    generalInfo(): Promise<{}>{
        return this.froniusService.generalInfo()
    }

    @Get("/data")
    information(): Promise<{}>{
        return this.froniusService.data()
    }

    @Get('/overgeneration')
    uebergenerierung(): Promise<number>{
        return this.froniusService.uebergenerierung()
    }

    @Get('/healthcheck')
    healthCheck(): Promise<boolean>{
        return this.froniusService.healthCheck()
    }
}
