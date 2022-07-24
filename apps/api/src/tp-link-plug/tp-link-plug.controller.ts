import {Body, Controller, Get, Post} from '@nestjs/common';
import {TpLinkPlugService} from "./tp-link-plug.service";

@Controller('tp-link-plug')
export class TpLinkPlugController {

    constructor(private readonly tpLinkService: TpLinkPlugService) {
    }

    @Get('ping')
    ping(): string {
        return "pong"
    }

    @Get('healthcheck')
    healthCheck(): Promise<boolean> {
        return this.tpLinkService.healthCheck();
    }

    @Get()
    info() {
        return this.tpLinkService.getGeneralInfo()
    }

    @Post('force-on')
    on(@Body() body): Promise<boolean> {
        return this.tpLinkService.turnPlugOn(body.ip)
    }

    @Post('force-off')
    off(@Body() body): Promise<boolean> {
        return this.tpLinkService.turnPlugOff(body.ip)
    }

    @Post('deviceInfo')
    deviceInfo(@Body() body): Promise<any> {
        return this.tpLinkService.getDeviceInfo(body.ip)
    }


    @Post('energy-on')
    async onWhileEnoughEnergy(@Body() body): Promise<boolean> {
        return this.tpLinkService.turnOnWithEnergyConstraint(body.ip, +body.minEnergy)
    }

}
