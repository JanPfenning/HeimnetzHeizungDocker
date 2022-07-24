import { Injectable } from '@nestjs/common';


@Injectable()
export class TemperatureService {

    async healthCheckSensor() {
        return false
    }

}
