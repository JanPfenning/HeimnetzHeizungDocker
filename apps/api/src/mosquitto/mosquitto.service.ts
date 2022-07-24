import { Injectable } from '@nestjs/common';
import { DatabaseService } from "../database/database.service";

import * as mqtt from "mqtt";

import * as MQTT from "async-mqtt";

@Injectable()
export class MosquittoService {

  host = process.env['MQTT_HOST']
  port = process.env['MQTT_PORT']
  clientId = `mqtt_nestjs_api`
  connectUrl = `mqtt://${this.host}:${this.port}`

  username = 'nestjs_service'
  password = process.env['MQTT_PASS']

  constructor(private readonly database: DatabaseService) {
    this.declareFunctions()
  }

  async healthCheckBroker(): Promise<boolean> {
    let client

    const expected_response = "pong"
    try {
      client = await MQTT.connectAsync(this.connectUrl)

      const promise: Promise<boolean> = new Promise((resolve, reject) => {
        client.on("message", async (topic, payload) => {
          const message = payload.toString();
          await client.end();
          if (message === expected_response) resolve(true)
          reject(false)
        });
      });

      await client.subscribe("/ping");
      await client.publish("/ping", expected_response);
      return await promise
    } catch (e) {
      //console.log(e.stack);
    } finally {
      if (client) client.end()
    }
    return false
  }

  getClient() {
    const clientId = this.clientId
    return mqtt.connect(this.connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      //username: 'nestjs_service',
      //password: process.env['MQTT_PASS'],
      reconnectPeriod: 1000,
    })
  }

  declareFunctions() {
    const topic = "/esp/temperature"
    const client = this.getClient()

    client.on('message', (topic, payload) => {
      this.database.storeTemperature(payload.toString());
    })

    client.on('connect', () => {
      client.subscribe([topic])
    });

    client.on('error', (error) => {
      console.log('client', error);
    });


  }

}

