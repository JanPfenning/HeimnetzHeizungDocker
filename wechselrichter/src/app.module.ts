import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TpLinkPlugController } from './tp-link-plug/tp-link-plug.controller';
import { ConfigModule } from '@nestjs/config';
import { FroniusPhotovoltaikController } from './fronius-photovoltaik/fronius-photovoltaik.controller';
import { FroniusPhotovoltaikService } from './fronius-photovoltaik/fronius-photovoltaik.service';
import { TpLinkPlugService } from './tp-link-plug/tp-link-plug.service';
import { TemperatureService } from './temperature/temperature.service';
import { TemperatureController } from './temperature/temperature.controller';
import { DatabaseService } from './database/database.service';
import { MosquittoService } from './mosquitto/mosquitto.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TpLinkPlugController, FroniusPhotovoltaikController, TemperatureController],
  providers: [AppService, FroniusPhotovoltaikService, TpLinkPlugService, TemperatureService, DatabaseService, MosquittoService],
})
export class AppModule {}
