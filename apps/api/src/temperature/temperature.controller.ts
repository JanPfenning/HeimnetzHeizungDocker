import {Controller, Get} from '@nestjs/common';

@Controller('temperature')
export class TemperatureController {
    @Get()
    pastData(from: number, to: number){
        //TODO
    }

}
